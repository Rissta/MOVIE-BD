import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const studioId = searchParams.get('id');

        if (!studioId) {
            return NextResponse.json(
                { error: 'ID студии не указан' },
                { status: 400 }
            );
        }

        // Начинаем транзакцию для безопасного удаления связанных данных
        await prisma.$transaction(async (tx) => {
            // Удаляем саму запись о студии
            await tx.studio.delete({
                where: { id: studioId },
            });
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Ошибка при удалении студии:', error);
        return NextResponse.json(
            { error: 'При удалении студии произошла ошибка' },
            { status: 500 }
        );
    }
}