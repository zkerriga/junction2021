package ru.aboba.backend.endpoints.stats

import cats.effect.kernel.Sync
import cats.implicits._
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl
import ru.aboba.backend.types.Liter.LiterParamMatcher

object StatsEndpoint {

  def routes[F[_]: Sync](service: StatsService[F]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] {
      case GET -> Root / "user" / "stats" / "shower" / "time" =>
        for {
          stats    <- service.getAverageShowerTime
          response <- Ok(stats)
        } yield response

      case GET -> Root / "user" / "stats" / "consumption" :? LiterParamMatcher(liter) =>
        for {
          consumption <- service.getConsumption(liter)
          response    <- Ok(consumption)
        } yield response
    }
  }

}
