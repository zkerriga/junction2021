package ru.aboba.backend.data.models

import cats.implicits._
import io.circe.{Decoder, HCursor}

final case class Apartment(
    people: Int,
    shower: System,
    kitchenFaucet: System,
    bathFaucet: System,
    washingMachine: System,
    dishwasher: System
)

object Apartment {
  implicit val apartmentDecoder: Decoder[Apartment] = (c: HCursor) =>
    (
      c.downField("people").as[Int],
      c.downField("Hydractiva_shower").as[System],
      c.downField("Kitchen_optima_faucet").as[System],
      c.downField("Optima_faucet").as[System],
      c.downField("Washing_machine").as[System],
      c.downField("Dishwasher").as[System]
    ).mapN(Apartment(_, _, _, _, _, _))
}
