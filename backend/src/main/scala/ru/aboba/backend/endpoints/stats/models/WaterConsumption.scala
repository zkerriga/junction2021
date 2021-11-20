package ru.aboba.backend.endpoints.stats.models

import io.circe.Encoder
import io.circe.generic.semiauto.deriveEncoder
import org.http4s.EntityEncoder
import org.http4s.circe.jsonEncoderOf

final case class WaterConsumption(liters: BigDecimal, kWh: BigDecimal)

object WaterConsumption {
  implicit val waterConsumptionEncoder: Encoder[WaterConsumption] = deriveEncoder
  implicit def waterConsumptionEntityEncoder[F[_]]: EntityEncoder[F, WaterConsumption] =
    jsonEncoderOf
}
