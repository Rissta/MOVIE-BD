import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Получение всех фильмов
    const movies = await prisma.movie.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    // Преобразование данных в формат, подходящий для селекта
    const formattedMovies = movies.map((movie) => ({
      value: movie.id,
      label: movie.title,
    })).sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({ movies: formattedMovies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}