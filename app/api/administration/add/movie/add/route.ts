import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      genre,
      duration,
      country,
      language,
      releaseYear,
      description,
      studioId,
      personIds,
      award,
      rating,
    } = body;

    // Создание фильма
    const movie = await prisma.movie.create({
      data: {
        title,
        genre,
        duration: parseInt(duration, 10),
        country,
        language,
        releaseYear: parseInt(releaseYear, 10),
        description,
        studioId,
        persons: {
          create: personIds.map((personId: string) => ({
            person: { connect: { id: personId } },
          })),
        },
      },
    });

    // Создание награды (если указан хотя бы один из атрибутов)
    if (award && (award.name || award.category || award.awardDate)) {
      await prisma.award.create({
        data: {
          awardName: award.name || "", // Если не указан, сохраняем как null
          category: award.category || "", // Если не указан, сохраняем как null
          awardDate: award.awardDate || "", // Если не указан, сохраняем как null
          movieId: movie.id,
        },
      });
    }

    // Создание рейтинга (если указан хотя бы один из атрибутов)
    if (rating && (rating.type || rating.reviewCount || rating.value)) {
      await prisma.rating.create({
        data: {
          ratingType: rating.type || "", // Если не указан, сохраняем как null
          reviewCount: rating.reviewCount ? parseInt(rating.reviewCount, 10) : 0, // Если не указан, сохраняем как null
          ratingValue: rating.value ? parseFloat(rating.value) : 0, // Если не указан, сохраняем как null
          movieId: movie.id,
        },
      });
    }

    return NextResponse.json({ success: true, movie }, { status: 201 });
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}