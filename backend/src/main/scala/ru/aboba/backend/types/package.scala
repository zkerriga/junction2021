package ru.aboba.backend

import derevo.circe.{decoder, encoder}
import derevo.derive
import supertagged.TaggedType

import java.time.LocalDateTime

package object types {

  @derive(decoder, encoder)
  object Liter extends TaggedType[BigDecimal] {
    def from(d: Double): Liter =
      Liter(BigDecimal(d))
  }
  type Liter = Liter.Type

  @derive(decoder, encoder)
  object Power extends TaggedType[BigDecimal] {
    def from(d: Double): Power =
      Power(BigDecimal(d))
  }
  type Power = Power.Type

  @derive(decoder, encoder)
  object Temperature extends TaggedType[BigDecimal]
  type Temperature = Temperature.Type

  @derive(decoder, encoder)
  object FlowTime extends TaggedType[BigDecimal]
  type FlowTime = FlowTime.Type

  @derive(decoder, encoder)
  object Timestamp extends TaggedType[LocalDateTime]
  type Timestamp = Timestamp.Type

}