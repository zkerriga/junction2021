package ru.aboba.backend.data

import cats.Applicative
import cats.effect.kernel.Sync
import cats.implicits._
import ru.aboba.backend.data.models.{Apartment, Data, Measurement}
import ru.aboba.backend.types.Liter
import ru.aboba.backend.types.Liter.Ops

import java.time.LocalDateTime

trait DataService[F[_]] {
  def getUserPeopleCount: F[Int]

  def getUserMeasurements: F[Vector[Measurement]]

  def getOtherFamiliesConsumption: F[Vector[(Int, Liter)]]
}

object DataService {

  final case class FamilyNotFoundError() extends Throwable

  private final class Impl[F[_]: Sync](data: Data) extends DataService[F] {

    override def getUserPeopleCount: F[Int] =
      getUserApartment map (_.people)

    override def getUserMeasurements: F[Vector[Measurement]] =
      getUserApartment map familyMeasurements

    override def getOtherFamiliesConsumption: F[Vector[(Int, Liter)]] =
      Applicative[F].pure {
        data.houses flatMap { house =>
          house.apartments map { ap =>
            ap.people -> familyMeasurements(ap).map(_.waterConsumption).fold(Liter.zero) {
              (acc, liter) => acc plus liter
            }
          }
        }
      }

    // internal

    private def getUserApartment: F[Apartment] =
      Sync[F].fromOption(
        data.houses.headOption flatMap { house =>
          house.apartments.headOption
        },
        FamilyNotFoundError()
      )

    private def familyMeasurements(ap: Apartment): Vector[Measurement] =
      filterForMonth(
        ap.shower.measurements ++
          ap.bathFaucet.measurements ++
          ap.dishwasher.measurements ++
          ap.kitchenFaucet.measurements ++
          ap.washingMachine.measurements
      )

    private def filterForMonth(measurements: Vector[Measurement]): Vector[Measurement] =
      measurements.filter { measurement =>
        val dateTime: LocalDateTime = measurement.timestamp
        dateTime.isAfter(LocalDateTime.of(2020, 12, 1, 0, 0)) // :)
      }
  }

  def impl[F[_]: Sync](data: Data): DataService[F] =
    new Impl[F](data)
}
