package ru.aboba.backend.endpoints.stats.models

import io.circe.Encoder
import io.circe.generic.semiauto.deriveEncoder
import org.http4s.EntityEncoder
import org.http4s.circe.jsonEncoderOf

final case class AverageTime(hours: Int, minutes: Int, seconds: Int)

object AverageTime {
  implicit val averageTimeEncoder: Encoder[AverageTime] = deriveEncoder
  implicit def averageTimeEntityEncoder[F[_]]: EntityEncoder[F, AverageTime] =
    jsonEncoderOf
}
