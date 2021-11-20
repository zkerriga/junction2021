package ru.aboba.backend.endpoints.rating

import cats.Monad
import cats.implicits._
import ru.aboba.backend.data.DataService
import ru.aboba.backend.endpoints.rating.models.UserRating
import ru.aboba.backend.types.Liter

trait RatingService[F[_]] {
  def getUserRating: F[UserRating]
}

object RatingService {

  private final class Impl[F[_]: Monad](service: DataService[F]) extends RatingService[F] {
    override def getUserRating: F[UserRating] =
      for {
        userMeasurements <- service.getUserMeasurements
        userFamilySize   <- service.getUserPeopleCount

        userLiters = userMeasurements
          .map(_.waterConsumption)
          .fold(Liter.zero)(_ plus _) / userFamilySize

        otherFamilies <- service.getOtherFamiliesConsumption

        familiesConsumptions = otherFamilies map { case (peoples, consumption) =>
          consumption / peoples
        }
        sortedConsumptions = familiesConsumptions.appended(userLiters).sorted
        place              = sortedConsumptions.takeWhile(_ < userLiters).length + 1

      } yield UserRating(totalUsers = otherFamilies.length + 1, place = place)
  }

  def impl[F[_]: Monad](service: DataService[F]): RatingService[F] = new Impl[F](service)
}
