package ru.aboba.backend

import cats.effect.{ExitCode, IO, IOApp}
import ru.aboba.backend.data.DataResource

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] = {
    for {
      resource <- DataResource.make[IO]
      code     <- BackendServer.stream[IO](resource).compile.drain.as(ExitCode.Success)
    } yield code
  }
}
