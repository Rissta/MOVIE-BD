import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;

    console.log("Параметры запроса:", {
      studioName: searchParams.get("studioName"),
      country: searchParams.get("country"),
      movie: searchParams.get("movie"),
    });

    // Формируем условия фильтрации
    const whereConditions: any = {};

    if (searchParams.get("studioName")) {
      whereConditions.studioName = { contains: searchParams.get("studioName") };
    }

    if (searchParams.get("country")) {
      whereConditions.country = { equals: searchParams.get("country") };
    }

    if (searchParams.get("movie")) {
      whereConditions.movies = {
        some: { title: { contains: searchParams.get("movie") } },
      };
    }

    // Запрос к базе данных
    const filteredStudios = await prisma.studio.findMany({
      where: whereConditions,
      include: {
        movies: true, // Включаем связанные фильмы
      },
    });

    if (filteredStudios.length === 0) {
      return NextResponse.json({
        studios: [],
        filters: {
          countries: [],
          movies: [],
        },
      });
    }

    // Форматирование данных
    const formattedStudios = filteredStudios.map((studio) => ({
      id: studio.id,
      studioName: studio.studioName || "Нет данных",
      country: studio.country || "Нет данных",
      foundationYear: studio.foundedYear?.toString() || "Нет данных",
      movies: studio.movies && studio.movies.length > 0
        ? studio.movies.map((movie) => movie.title)
        : ["Нет данных"],
    }));

    // Уникальные значения для фильтров
    const uniqueCountries = Array.from(
      new Set(filteredStudios.map((studio) => studio.country))
    ).filter(Boolean);

    const uniqueMovies = Array.from(
      new Set(filteredStudios.flatMap((studio) => studio.movies.map((movie) => movie.title)))
    ).filter(Boolean);

    return NextResponse.json({
      studios: formattedStudios,
      filters: {
        countries: uniqueCountries,
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