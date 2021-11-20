package ru.aboba.backend

import derevo.circe.{decoder, encoder}
import derevo.derive
import org.http4s.QueryParamDecoder
import org.http4s.dsl.impl.QueryParamDecoderMatcher
import supertagged.TaggedType

import java.time.LocalDateTime

package object types {

  @derive(decoder, encoder)
  object Liter extends TaggedType[BigDecimal] {
    val zero: Liter = Liter(BigDecimal(0))

    def from(d: Double): Liter =
      Liter(BigDecimal(d))

    implicit val literDecoder: QueryParamDecoder[Liter] =
      QueryParamDecoder[Double].map(Liter.from)

    object LiterParamMatcher extends QueryParamDecoderMatcher[Liter]("goalLiters")

    implicit class Ops(private val liter: Liter) extends AnyVal {
      def plus(other: Liter): Liter = Liter(liter + other)
    }
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
