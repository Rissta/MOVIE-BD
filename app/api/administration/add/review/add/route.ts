import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Парсим тело запроса
    const body = await request.json();

    const { reviewText, authorName, reviewDate, reviewRating, movieId } = body;

    // Валидация входных данных
    if (!reviewText || !authorName || !reviewDate || !movieId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Создание рецензии
    const review = await prisma.review.create({
      data: {
        reviewText,
        authorName,
        reviewDate,
        reviewRating: parseFloat(reviewRating), // Преобразуем рейтинг в число
        movie: {
          connect: { id: movieId }, // Связываем рецензию с фильмом по movieId
        },
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}