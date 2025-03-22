import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;

    console.log("Параметры запроса:", {
      name: searchParams.get("name"),
      nationality: searchParams.get("nationality"),
      role: searchParams.get("role"),
      movie: searchParams.get("movie"),
    });

    // Формируем условия фильтрации
    const whereConditions: any = {};

    if (searchParams.get("name")) {
      whereConditions.name = { contains: searchParams.get("name") };
    }

    if (searchParams.get("nationality")) {
      whereConditions.nationality = { equals: searchParams.get("nationality") };
    }

    if (searchParams.get("role")) {
      whereConditions.role = { equals: searchParams.get("role") };
    }

    if (searchParams.get("movie")) {
      whereConditions.movies = {
        some: { movie: { title: { contains: searchParams.get("movie") } } },
      };
    }

    // Запрос к базе данных
    const filteredPersons = await prisma.person.findMany({
      where: whereConditions,
      include: {
        movies: {
          include: {
            movie: true, // Включаем данные фильмов через промежуточную таблицу PersonOnMovie
          },
        },
      },
    });

    if (filteredPersons.length === 0) {
      return NextResponse.json({
        persons: [],
        filters: {
          nationalities: [],
          roles: [],
          movies: [],
        },
      });
    }

    // Форматирование данных
    const formattedPersons = filteredPersons.map((person) => ({
      id: person.id,
      name: person.name || "Нет данных",
      nationality: person.nationality || "Нет данных",
      role: person.role || "Неизвестная роль",
      birthDate: person.dateOfBirth?.toString() || "Нет данных",
      movies: person.movies && person.movies.length > 0
        ? person.movies.map((movieOnMovie) => movieOnMovie.movie.title)
        : ["Нет данных"],
    }));

    // Уникальные значения для фильтров
    const uniqueNationalities = Array.from(
      new Set(filteredPersons.map((person) => person.nationality))
    ).filter(Boolean);

    const uniqueRoles = Array.from(
      new Set(filteredPersons.map((person) => person.role))
    ).filter(Boolean);

    const uniqueMovies = Array.from(
      new Set(filteredPersons.flatMap((person) =>
        person.movies.map((movieOnMovie) => movieOnMovie.movie.title)
      ))
    ).filter(Boolean);

    return NextResponse.json({
      persons: formattedPersons,
      filters: {
        nationalities: uniqueNationalities,
        roles: uniqueRoles,
        movies: uniqueMovies,
      },
    });
  } catch (error: unknown) {
    console.error("Ошибка при выборке данных:", error);
    return NextResponse.json(
      { error: "При загрузке данных произошла ошибка" },
      { status: 500 }
    );
  }
}