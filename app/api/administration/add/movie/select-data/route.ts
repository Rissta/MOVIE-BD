import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Получение уникальных значений для стран, языков и жанров из таблицы Movie
    const countries = await prisma.movie.findMany({
      select: { country: true },
      distinct: ["country"],
    });

    const languages = await prisma.movie.findMany({
      select: { language: true },
      distinct: ["language"],
    });

    // Получение списка студий из таблицы Studio
    const studios = await prisma.studio.findMany({
      select: { id: true, studioName: true },
    });

    // Получение списка персон из таблицы Person
    const persons = await prisma.person.findMany({
      select: { id: true, name: true },
    });

    // Преобразование данных в формат, подходящий для селектов
    const formattedCountries = countries.map((item) => item.country);
    const formattedLanguages = languages.map((item) => item.language);

    const formattedStudios = studios.map((studio) => ({
      value: studio.id,
      label: studio.studioName,
    }));

    const formattedPersons = persons.map((person) => ({
      value: person.id,
      label: person.name,
    }));

    // Возвращение данных в виде JSON
    return NextResponse.json({
      countries: formattedCountries,
      languages: formattedLanguages,
      studios: formattedStudios,
      persons: formattedPersons,
    });
  } catch (error) {
    console.error("Error fetching select data:", error);
    return NextResponse.json(
      { error: "Failed to fetch select data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}