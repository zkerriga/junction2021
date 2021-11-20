package ru.aboba.backend.data.models

import cats.implicits._
import io.circe.{Decoder, HCursor}

final case class Apartment(
    people: Int,
    shower: Vector[Measurement],
    kitchenFaucet: Vector[Measurement],
    bathFaucet: Vector[Measurement],
    washingMachine: Vector[Measurement],
    dishwasher: Vector[Measurement]
)

object Apartment {
  implicit val apartmentDecoder: Decoder[Apartment] = (c: HCursor) =>
    (
      c.downField("people").as[Int],
      c.downField("Hydractiva_shower").as[Vector[Measurement]],
      c.downField("Kitchen_optima_faucet").as[Vector[Measurement]],
      c.downField("Optima_faucet").as[Vector[Measurement]],
      c.downField("Washing_machine").as[Vector[Measurement]],
      c.downField("Dishwasher").as[Vector[Measurement]]
    ).mapN(Apartment(_, _, _, _, _, _))
}
