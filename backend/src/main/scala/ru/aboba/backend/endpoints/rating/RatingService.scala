package ru.aboba.backend.endpoints.rating

import cats.Applicative
import ru.aboba.backend.endpoints.rating.models.UserRating

trait RatingService[F[_]] {
  def getUserRating: F[UserRating]
}

object RatingService {

  final private class Stub[F[_]: Applicative] extends RatingService[F] {

    override def getUserRating: F[UserRating] =
      Applicative[F].pure {
        UserRating(totalUsers = 100, place = 40)
      }
  }

  def impl[F[_]: Applicative]: RatingService[F] = new Stub[F]
}
