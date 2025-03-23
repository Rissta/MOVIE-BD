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

    // Создание награды (если данные предоставлены)
    if (award && award.name && award.category && award.awardDate) {
      await prisma.award.create({
        data: {
          awardName: award.name,
          category: award.category,
          awardDate: award.awardDate,
          movieId: movie.id,
        },
      });
    }

    // Создание рейтинга (если данные предоставлены)
    if (rating && rating.type && rating.reviewCount && rating.value) {
      await prisma.rating.create({
        data: {
          ratingType: rating.type,
          reviewCount: parseInt(rating.reviewCount, 10),
          ratingValue: parseFloat(rating.value),
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