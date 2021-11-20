package ru.aboba.backend.endpoints.stats

import cats.Applicative
import ru.aboba.backend.endpoints.stats.models.{AverageTime, Consumption, WaterConsumption}
import ru.aboba.backend.types.{Liter, Power}

trait StatsService[F[_]] {
  def getAverageShowerTime: F[AverageTime]

  def getConsumption(goal: Liter): F[Consumption]
}

object StatsService {

  final private class Stub[F[_]: Applicative] extends StatsService[F] {
    override def getAverageShowerTime: F[AverageTime] =
      Applicative[F].pure {
        AverageTime(hours = 0, minutes = 45, seconds = 51)
      }

    override def getConsumption(goal: Liter): F[Consumption] =
      Applicative[F].pure {
        Consumption(
          status = 0,
          consumption = WaterConsumption(
            liters = Liter.from(140.31),
            kWh = Power.from(510.10)
          )
        )
      }
  }

  def impl[F[_]: Applicative]: StatsService[F] = new Stub[F]
}
