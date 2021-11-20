package ru.aboba.backend

import cats.effect.{Async, Resource}
import cats.syntax.all._
import com.comcast.ip4s._
import fs2.Stream
import org.http4s.ember.client.EmberClientBuilder
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.implicits._
import org.http4s.server.middleware.Logger
import ru.aboba.backend.data.DataService
import ru.aboba.backend.data.models.Data
import ru.aboba.backend.endpoints.rating.{RatingEndpoint, RatingService}
import ru.aboba.backend.endpoints.stats.{StatsEndpoint, StatsService}

object BackendServer {

  def stream[F[_]: Async](resource: Data): Stream[F, Nothing] = {
    for {
      _ <- Stream.resource(EmberClientBuilder.default[F].build)
      dataService   = DataService.impl[F](resource)
      ratingService = RatingService.impl[F](dataService)
      statsService  = StatsService.impl[F](dataService)

      // Combine Service Routes into an HttpApp.
      // Can also be done via a Router if you
      // want to extract a segments not checked
      // in the underlying routes.
      httpApp = (
        RatingEndpoint.routes[F](ratingService) <+>
          StatsEndpoint.routes[F](statsService)
      ).orNotFound

      // With Middlewares in place
      finalHttpApp = Logger.httpApp(true, true)(httpApp)

      exitCode <- Stream.resource(
        EmberServerBuilder
          .default[F]
          .withHost(ipv4"0.0.0.0")
          .withPort(port"8080")
          .withHttpApp(finalHttpApp)
          .build >>
          Resource.eval(Async[F].never)
      )
    } yield exitCode
  }.drain
}
