import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, nationality, role, birthDate, movieIds } = body;

    // Создание персоны
    const person = await prisma.person.create({
      data: {
        name,
        nationality,
        role,
        dateOfBirth: birthDate,
        movies: {
          create: movieIds.map((movieId: string) => ({
            movie: { connect: { id: movieId } },
          })),
        },
      },
    });

    return NextResponse.json({ success: true, person }, { status: 201 });
  } catch (error) {
    console.error("Error creating person:", error);
    return NextResponse.json(
      { error: "Failed to create person" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}