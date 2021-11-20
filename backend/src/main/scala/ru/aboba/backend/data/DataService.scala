package ru.aboba.backend.data

import cats.Applicative
import cats.effect.kernel.Sync
import cats.implicits._
import ru.aboba.backend.data.models.{Apartment, Data, Measurement}
import ru.aboba.backend.types.Liter
import ru.aboba.backend.types.Liter.Ops

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

    private def getUserApartment: F[Apartment] =
      Sync[F].fromOption(
        data.houses.headOption flatMap { house =>
          house.apartments.headOption
        },
        FamilyNotFoundError()
      )

    private def familyMeasurements(ap: Apartment): Vector[Measurement] =
      ap.shower.measurements ++
        ap.bathFaucet.measurements ++
        ap.dishwasher.measurements ++
        ap.kitchenFaucet.measurements ++
        ap.washingMachine.measurements

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

  }

  def impl[F[_]: Sync](data: Data): DataService[F] =
    new Impl[F](data)
}
