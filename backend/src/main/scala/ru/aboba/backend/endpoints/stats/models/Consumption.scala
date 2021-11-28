package ru.aboba.backend.endpoints.stats.models

import io.circe.Encoder
import io.circe.generic.semiauto.deriveEncoder
import org.http4s.EntityEncoder
import org.http4s.circe.jsonEncoderOf
import ru.aboba.backend.types.ConsumptionStatus

final case class Consumption(
    status: ConsumptionStatus,
    consumption: WaterConsumption
)

object Consumption {
  implicit val consumptionEncoder: Encoder[Consumption] = deriveEncoder
  implicit def consumptionEntityEncoder[F[_]]: EntityEncoder[F, Consumption] =
    jsonEncoderOf
}
