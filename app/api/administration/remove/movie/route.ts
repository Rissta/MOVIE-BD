import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const movieId = searchParams.get('id');

        if (!movieId) {
            return NextResponse.json(
                { error: 'ID фильма не указан' },
                { status: 400 }
            );
        }

        // Начинаем транзакцию для безопасного удаления связанных данных
        await prisma.$transaction(async (tx) => {
            // Удаляем связи между фильмом и людьми
            await tx.personOnMovie.deleteMany({
                where: { movieId: movieId }, // Удаляем записи из таблицы PersonMovie
            });

            // Удаляем связанные награды
            await tx.award.deleteMany({
                where: { movieId: movieId },
            });

            // Удаляем связанный рейтинг
            await tx.rating.deleteMany({
                where: { movieId: movieId },
            });

            // Удаляем сам фильм
            await tx.movie.delete({
                where: { id: movieId },
            });
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Ошибка при удалении фильма:', error);
        return NextResponse.json(
            { error: 'При удалении фильма произошла ошибка' },
            { status: 500 }
        );
    }
}