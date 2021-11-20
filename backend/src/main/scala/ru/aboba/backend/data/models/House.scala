package ru.aboba.backend.data.models

import io.circe.Decoder
import io.circe.derivation.deriveDecoder

final case class House(apartments: Vector[Apartment])

object House {
  implicit val houseDecoder: Decoder[House] = deriveDecoder
}
