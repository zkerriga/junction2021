package ru.aboba.backend.data.models

import io.circe.Decoder
import io.circe.derivation.deriveDecoder

final case class System(measurements: Vector[Measurement])

object System {
  implicit val systemDecoder: Decoder[System] = deriveDecoder
}
