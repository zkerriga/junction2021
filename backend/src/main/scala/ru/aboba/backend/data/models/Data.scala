package ru.aboba.backend.data.models

import io.circe.Decoder
import io.circe.derivation.deriveDecoder

case class Data(houses: House)

object Data {
  implicit val dataDecoder: Decoder[Data] = deriveDecoder
}
