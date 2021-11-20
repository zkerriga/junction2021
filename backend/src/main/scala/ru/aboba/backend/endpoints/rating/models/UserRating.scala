package ru.aboba.backend.endpoints.rating.models

import io.circe.Encoder
import io.circe.generic.semiauto.deriveEncoder
import org.http4s.EntityEncoder
import org.http4s.circe.jsonEncoderOf

final case class UserRating(totalUsers: Int, place: Int)

object UserRating {
  implicit val userRatingEncoder: Encoder[UserRating] = deriveEncoder
  implicit def userRatingEntityEncoder[F[_]]: EntityEncoder[F, UserRating] =
    jsonEncoderOf
}
