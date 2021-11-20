package ru.aboba.backend.data

import cats.effect.Sync
import cats.implicits._
import io.circe.parser.parse
import ru.aboba.backend.data.models.Data

import scala.io.Source

object DataResource {

  private def getResourceLines[I[_]: Sync]: I[Iterator[String]] = {
    Sync[I].delay {
      Source.fromResource("db.json").getLines()
    }
  }

  private def parseData[I[_]: Sync](data: String): I[Data] =
    for {
      json <- Sync[I].fromEither(parse(data))
      data <- Sync[I].fromEither(json.as[Data])
    } yield data

  def make[I[_]: Sync]: I[Data] =
    for {
      iterator <- getResourceLines[I]
      dataString = iterator.mkString
      data <- parseData(dataString)
    } yield data

}
