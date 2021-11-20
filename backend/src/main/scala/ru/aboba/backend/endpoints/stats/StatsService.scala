package ru.aboba.backend.endpoints.stats

import cats.Applicative
import ru.aboba.backend.endpoints.stats.models.{AverageTime, WaterConsumption}

trait StatsService[F[_]] {
  def getAverageShowerTime: F[AverageTime]

  def getWaterConsumption: F[WaterConsumption]
}

object StatsService {

  final private class Stub[F[_]: Applicative] extends StatsService[F] {
    override def getAverageShowerTime: F[AverageTime] =
      Applicative[F].pure {
        AverageTime(hours = 0, minutes = 45, seconds = 51)
      }

    override def getWaterConsumption: F[WaterConsumption] =
      Applicative[F].pure {
        WaterConsumption(liters = 140.31, kWh = 510.10)
      }
  }

  def impl[F[_]: Applicative]: StatsService[F] = new Stub[F]
}
