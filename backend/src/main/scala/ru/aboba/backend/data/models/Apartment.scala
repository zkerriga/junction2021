package ru.aboba.backend.data.models

final case class Apartment(
    people: Int,
    shower: Vector[Measurement],
    kitchenFaucet: Vector[Measurement],
    bathFaucet: Vector[Measurement],
    washingMachine: Vector[Measurement],
    dishwasher: Vector[Measurement]
)
