package ru.aboba.backend.endpoints.rating

import cats.effect.Sync
import cats.implicits._
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl

object RatingEndpoint {

  def routes[F[_]: Sync](service: RatingService[F]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] { case GET -> Root / "user" / "rating" =>
      for {
        rating   <- service.getUserRating
        response <- Ok(rating)
      } yield response
    }
  }

}
