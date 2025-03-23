import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Получение уникальных значений для национальностей и ролей из таблицы Person
    const nationalities = await prisma.person.findMany({
      select: { nationality: true },
      distinct: ["nationality"],
    });

    const roles = await prisma.person.findMany({
      select: { role: true },
      distinct: ["role"],
    });

    // Получение списка фильмов из таблицы Movie
    const movies = await prisma.movie.findMany({
      select: { id: true, title: true },
    });

    // Преобразование данных в формат, подходящий для селектов
    const formattedNationalities = nationalities.map((item) => item.nationality);
    const formattedRoles = roles.map((item) => item.role);

    const formattedMovies = movies.map((movie) => ({
      value: movie.id,
      label: movie.title,
    }));

    // Возвращение данных в виде JSON
    return NextResponse.json({
      nationalities: formattedNationalities,
      roles: formattedRoles,
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