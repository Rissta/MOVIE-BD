import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const personId = searchParams.get('id');

        if (!personId) {
            return NextResponse.json(
                { error: 'ID человека не указан' },
                { status: 400 }
            );
        }

        // Начинаем транзакцию для безопасного удаления связанных данных
        await prisma.$transaction(async (tx) => {
            // Удаляем связи между человеком и фильмами
            await tx.personOnMovie.deleteMany({
                where: { personId: personId }, // Удаляем записи из таблицы PersonOnMovie
            });

            // Удаляем саму запись о человеке
            await tx.person.delete({
                where: { id: personId },
            });
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Ошибка при удалении человека:', error);
        return NextResponse.json(
            { error: 'При удалении человека произошла ошибка' },
            { status: 500 }
        );
    }
}