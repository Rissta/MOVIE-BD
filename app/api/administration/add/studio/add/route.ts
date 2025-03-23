import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, country, foundationDate, movieIds } = body;

    // Создание студии
    const studio = await prisma.studio.create({
      data: {
        studioName: name,
        country,
        foundedYear: parseInt(foundationDate, 10),
        movies: {
          connect: movieIds.map((movieId: string) => ({ id: movieId })),
        },
      },
    });

    return NextResponse.json({ success: true, studio }, { status: 201 });
  } catch (error) {
    console.error("Error creating studio:", error);
    return NextResponse.json(
      { error: "Failed to create studio" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}