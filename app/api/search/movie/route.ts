import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Используем $transaction для выполнения всех запросов в одной транзакции
        const [
            movieCount,
            genres,
            languages,
            personCount,
            nationalities,
            studioCount,
            countries,
            studiosWithMovieCount,
            personsWithMovieCount,
        ] = await prisma.$transaction([
            // 1. Общее количество фильмов
            prisma.movie.count(),

            // 2. Все жанры из таблицы фильмов
            prisma.movie.findMany({
                select: {
                    genre: true,
                },
            }),

            // 3. Все уникальные языки из таблицы фильмов
            prisma.movie.findMany({
                select: {
                    language: true,
                },
                distinct: ['language'],
            }),

            // 4. Общее количество людей
            prisma.person.count(),

            // 5. Уникальные национальности людей
            prisma.person.findMany({
                select: {
                    nationality: true,
                },
                distinct: ['nationality'],
            }),

            // 6. Общее количество студий
            prisma.studio.count(),

            // 7. Уникальные страны студий
            prisma.studio.findMany({
                select: {
                    country: true,
                },
                distinct: ['country'],
            }),

            // 8. Количество фильмов у каждой студии
            prisma.studio.findMany({
                select: {
                    studioName: true,
                    _count: {
                        select: {
                            movies: true,
                        },
                    },
                },
            }),

            // 9. Количество фильмов у каждого человека
            prisma.person.findMany({
                select: {
                    name: true,
                    _count: {
                        select: {
                            movies: true,
                        },
                    },
                },
            }),
        ]);

        // Обработка жанров
        const allGenres: string[] = genres
            .map(genre => genre.genre?.split(',').map(g => g.trim()) || [])
            .flat();
        const uniqueGenres: string[] = [...new Set(allGenres)];

        const genreCount: number = uniqueGenres.filter(Boolean).length;

        // Обработка языков
        const languageCount: number = languages.filter(Boolean).length;

        // Обработка национальностей
        const nationalityCount: number = nationalities.filter(Boolean).length;

        // Обработка стран
        const countryCount: number = countries.filter(Boolean).length;

        // Форматирование данных о студиях
        const formattedStudios: { studioName: string; movieCount: number }[] =
            studiosWithMovieCount.map(studio => ({
                studioName: studio.studioName,
                movieCount: studio._count.movies,
            }));

        // Форматирование данных о людях
        const formattedPersons: { personName: string; movieCount: number }[] =
            personsWithMovieCount.map(person => ({
                personName: person.name,
                movieCount: person._count.movies,
            }));

        return NextResponse.json({
            movieCount,
            genreCount,
            languageCount,
            personCount,
            nationalityCount,
            studioCount,
            countryCount,
            formattedStudios,
            formattedPersons,
        });
    } catch (error: unknown) {
        console.error('Ошибка при выборке данных:', error);
        return NextResponse.json(
            { error: 'При загрузке данных произошла ошибка' },
            { status: 500 }
        );
    }
}