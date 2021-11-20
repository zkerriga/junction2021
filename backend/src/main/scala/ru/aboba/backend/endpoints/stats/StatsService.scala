package ru.aboba.backend.endpoints.stats

import cats.Monad
import cats.effect.kernel.Clock
import cats.implicits._
import ru.aboba.backend.data.DataService
import ru.aboba.backend.endpoints.stats.models.{AverageTime, Consumption, WaterConsumption}
import ru.aboba.backend.types.{ConsumptionStatus, Liter, Power}

import java.time.LocalDate
import scala.concurrent.duration.FiniteDuration

trait StatsService[F[_]] {
  def getAverageShowerTime: F[AverageTime]

  def getConsumption(goal: Liter): F[Consumption]
}

object StatsService {

  final private class Impl[F[_]: Monad: Clock](service: DataService[F]) extends StatsService[F] {

    override def getAverageShowerTime: F[AverageTime] =
      service.getUserMeasurements map { measurements =>
        val allSeconds =
          measurements
            .foldLeft(BigDecimal(0)) { (acc, measurement) =>
              acc + measurement.flowTime
            }
            .intValue

        val hours   = allSeconds / 3600
        val minutes = (allSeconds - hours * 3600) / 60
        val seconds = (allSeconds - hours * 3600) - minutes * 60
        AverageTime(hours = hours, minutes = minutes, seconds = seconds)
      }

    override def getConsumption(goal: Liter): F[Consumption] =
      service.getUserMeasurements flatMap { measurements =>
        val liters = measurements.map(_.waterConsumption).fold(Liter.zero)(_ plus _)
        val kWh    = measurements.map(_.powerConsumption).fold(Power.zero)(_ plus _)

        Clock[F].realTime map { time =>
          Consumption(
            status = computeConsumptionStatus(goal, liters, time).normalize,
            consumption = WaterConsumption(
              liters = liters,
              kWh = kWh
            )
          )
        }
      }

    private def computeConsumptionStatus(
        goal: Liter,
        spent: Liter,
        time: FiniteDuration
    ): ConsumptionStatus = {
      val daysOnMonth                       = 30
      val currentDay: Int                   = LocalDate.ofEpochDay(time.toDays).getDayOfMonth
      val goalSpentOnCurrentDay: BigDecimal = goal * currentDay / daysOnMonth

      if (spent < goalSpentOnCurrentDay / 2) ConsumptionStatus.best
      else if (spent >= goalSpentOnCurrentDay / 2 && spent < goalSpentOnCurrentDay)
        ConsumptionStatus((spent - goalSpentOnCurrentDay / 2) / goalSpentOnCurrentDay)
      else if (spent >= goalSpentOnCurrentDay && spent < goal)
        ConsumptionStatus(BigDecimal(0.5) - (spent - goalSpentOnCurrentDay) / goal)
      else
        ConsumptionStatus.worst
    }
  }

  def impl[F[_]: Monad: Clock](dataService: DataService[F]): StatsService[F] =
    new Impl[F](dataService)
}
