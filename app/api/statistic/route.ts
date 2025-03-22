import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {        
        // Первый блок статистики с таблицей фильмов
        const movieCount: number = await prisma.movie.count();

        const genres: { genre: string | null }[] = await prisma.movie.findMany({
            select: {
                genre: true,
            },
        });

        const languages: { language: string | null }[] = await prisma.movie.findMany({
            select: {
                language: true,
            },
            distinct: ['language'],
        });

        // Разделяем строки с жанрами на отдельные жанры и собираем их в один массив
        const allGenres: string[] = genres
            .map(genre => genre.genre?.split(',').map(g => g.trim()) || [])
            .flat();
        const uniqueGenres: string[] = [...new Set(allGenres)];

        const genreCount: number = uniqueGenres.filter(Boolean).length;
        const languageCount: number = languages.filter(Boolean).length;

        // Второй блок с людьми
        const personCount: number = await prisma.person.count();

        const nationalities: { nationality: string | null }[] = await prisma.person.findMany({
            select: {
                nationality: true,
            },
            distinct: ['nationality'],
        });
        const nationalityCount: number = nationalities.filter(Boolean).length;

        // Третий блок со студиями
        const studioCount: number = await prisma.studio.count();

        const countries: { country: string | null }[] = await prisma.studio.findMany({
            select: {
                country: true,
            },
            distinct: ['country'],
        });
        const countryCount: number = countries.filter(Boolean).length;

        // Четвертый блок с таблицей фильмов у студии
        const studiosWithMovieCount: { studioName: string; _count: { movies: number } }[] =
            await prisma.studio.findMany({
                select: {
                    studioName: true,
                    _count: {
                        select: {
                            movies: true,
                        },
                    },
                },
            });

        // Для удобства
        const formattedStudios: { studioName: string; movieCount: number }[] =
            studiosWithMovieCount.map(studio => ({
                studioName: studio.studioName,
                movieCount: studio._count.movies,
            }));

        // Пятый блок с таблицей фильмов у персоны
        const personsWithMovieCount: { name: string; _count: { movies: number } }[] =
            await prisma.person.findMany({
                select: {
                    name: true,
                    _count: {
                        select: {
                            movies: true,
                        },
                    },
                },
            });

        // Для удобства
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