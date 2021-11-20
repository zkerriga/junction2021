package ru.aboba.backend

import derevo.circe.{decoder, encoder}
import derevo.derive
import supertagged.TaggedType

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

}
