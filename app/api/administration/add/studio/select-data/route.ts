import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Получение уникальных значений для стран из таблицы Movie
    const countries = await prisma.studio.findMany({
      select: { country: true },
      distinct: ["country"],
    });

    // Получение списка фильмов из таблицы Movie
    const movies = await prisma.movie.findMany({
      select: { id: true, title: true },
    });

    // Преобразование данных в формат, подходящий для селектов
    const formattedCountries = countries.map((item) => item.country).sort();

    const formattedMovies = movies.map((movie) => ({
      value: movie.id,
      label: movie.title,
    })).sort((a, b) => a.label.localeCompare(b.label));

    // Возвращение данных в виде JSON
    return NextResponse.json({
      countries: formattedCountries,
      movies: formattedMovies,
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