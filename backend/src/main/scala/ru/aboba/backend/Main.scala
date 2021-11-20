package ru.aboba.backend

import cats.effect.{ExitCode, IO, IOApp}

object Main extends IOApp {
  def run(args: List[String]) =
    BackendServer.stream[IO].compile.drain.as(ExitCode.Success)
}
