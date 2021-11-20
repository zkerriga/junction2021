package ru.aboba.backend.endpoints.stats.models

import io.circe.Encoder
import io.circe.generic.semiauto.deriveEncoder
import org.http4s.EntityEncoder
import org.http4s.circe.jsonEncoderOf
import ru.aboba.backend.types.{Power, Liter}

final case class WaterConsumption(liters: Liter, kWh: KilowattPerHour)

object WaterConsumption {
  implicit val waterConsumptionEncoder: Encoder[WaterConsumption] = deriveEncoder
  implicit def waterConsumptionEntityEncoder[F[_]]: EntityEncoder[F, WaterConsumption] =
    jsonEncoderOf
}
