package ru.aboba.backend

import derevo.circe.{decoder, encoder}
import derevo.derive
import io.circe.Encoder
import org.http4s.QueryParamDecoder
import org.http4s.dsl.impl.QueryParamDecoderMatcher
import supertagged.TaggedType

import java.time.LocalDateTime
import scala.math.BigDecimal.RoundingMode

package object types {

  @derive(decoder)
  object Liter extends TaggedType[BigDecimal] {
    val zero: Liter = Liter(BigDecimal(0))

    def from(d: Double): Liter =
      Liter(BigDecimal(d))

    implicit val literEncoder: Encoder[Liter] =
      Encoder.encodeBigDecimal.contramap(l => l.setScale(2, RoundingMode.HALF_UP))

    implicit val literQueryParamDecoder: QueryParamDecoder[Liter] =
      QueryParamDecoder[Double].map(Liter.from)

    object LiterParamMatcher extends QueryParamDecoderMatcher[Liter]("goalLiters")

    implicit class Ops(private val liter: Liter) extends AnyVal {
      def plus(other: Liter): Liter = Liter(liter + other)
    }
  }
  type Liter = Liter.Type

  @derive(decoder)
  object Power extends TaggedType[BigDecimal] {
    val zero: Power = Power(BigDecimal(0))

    def from(d: Double): Power =
      Power(BigDecimal(d))

    implicit val powerEncoder: Encoder[Power] =
      Encoder.encodeBigDecimal.contramap(p => p.setScale(2, RoundingMode.HALF_UP))

    implicit class Ops(private val power: Power) extends AnyVal {
      def plus(other: Power): Power = Power(power + other)
    }
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

  @derive(decoder)
  object ConsumptionStatus extends TaggedType[BigDecimal] {
    val best: ConsumptionStatus  = ConsumptionStatus(BigDecimal(1))
    val worst: ConsumptionStatus = ConsumptionStatus(BigDecimal(0))

    implicit val consumptionStatusEncoder: Encoder[ConsumptionStatus] =
      Encoder.encodeBigDecimal.contramap(c => c.setScale(2, RoundingMode.HALF_UP))

    implicit class Ops(private val coefficient: ConsumptionStatus) extends AnyVal {
      def normalize: ConsumptionStatus = {
        val withK = ConsumptionStatus(coefficient * 1.2)

        if (withK > best) ConsumptionStatus.best
        else if (withK < worst) ConsumptionStatus.worst
        else withK
      }
    }
  }
  type ConsumptionStatus = ConsumptionStatus.Type

}
