package ru.aboba.backend.data.models

import cats.implicits._
import io.circe.{Decoder, HCursor}
import ru.aboba.backend.types.{FlowTime, Liter, Power, Temperature, Timestamp}

final case class Measurement(
    waterConsumption: Liter,
    flowTime: FlowTime,
    temperature: Temperature,
    powerConsumption: Power,
    timestamp: Timestamp
)

object Measurement {
  implicit val measurementDecoder: Decoder[Measurement] = (c: HCursor) =>
    (
      c.downField("Consumption").as[Liter],
      c.downField("FlowTime").as[FlowTime],
      c.downField("Temp").as[Temperature],
      c.downField("Power_Consumption").as[Power],
      c.downField("TimeStamp").as[Timestamp]
    ).mapN(Measurement(_, _, _, _, _))
}
