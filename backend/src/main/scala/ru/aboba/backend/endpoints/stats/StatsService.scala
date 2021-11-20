package ru.aboba.backend.endpoints.stats

import cats.Applicative
import ru.aboba.backend.endpoints.stats.models.AverageTime

trait StatsService[F[_]] {
  def getAverageShowerTime: F[AverageTime]
}

object StatsService {

  final private class Stub[F[_]: Applicative] extends StatsService[F] {
    override def getAverageShowerTime: F[AverageTime] =
      Applicative[F].pure {
        new AverageTime(hours = 0, minutes = 45, seconds = 51)
      }
  }

  def impl[F[_]: Applicative]: StatsService[F] = new Stub[F]
}
