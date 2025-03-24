import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;

        console.log("Параметры запроса:", {
            title: searchParams.get('title'),
            genre: searchParams.get('genre'),
            person: searchParams.get('person'),
            studio: searchParams.get('studio'),
            country: searchParams.get('country'),
            year: searchParams.get('year'),
            minRating: searchParams.get('minRating'),
        });

        const whereConditions: any = {};

        if (searchParams.get('title')) {
            whereConditions.title = { contains: searchParams.get('title') };
        }

        if (searchParams.get('genre')) {
            whereConditions.genre = { contains: searchParams.get('genre') };
        }

        if (searchParams.get('person')) {
            whereConditions.persons = {
                some: { person: { name: { contains: searchParams.get('person') } } },
            };
        }

        if (searchParams.get('studio')) {
            whereConditions.studio = { studioName: { contains: searchParams.get('studio') } };
        }

        if (searchParams.get('country')) {
            whereConditions.country = { contains: searchParams.get('country') };
        }

        if (searchParams.get('year')) {
            const parsedYear = parseInt(searchParams.get('year') || '', 10);
            if (!isNaN(parsedYear)) {
                whereConditions.releaseYear = { equals: parsedYear };
            }
        }

        if (searchParams.get('minRating')) {
            const parsedRating = parseFloat(searchParams.get('minRating') || '');
            if (!isNaN(parsedRating)) {
                whereConditions.rating = {
                    ratingValue: { gte: parsedRating },
                };
            }
        }

        const filteredMovies = await prisma.movie.findMany({
            where: whereConditions,
            include: {
                studio: true,
                persons: { include: { person: true } },
                rating: true,
            },
        });

        if (filteredMovies.length === 0) {
            return NextResponse.json({
                movies: [],
                filters: {
                    genres: [],
                    persons: [],
                    studios: [],
                    countries: [],
                    years: [],
                },
            });
        }

        const formattedMovies = filteredMovies.map(movie => ({
            id: movie.id,
            title: movie.title || "Нет данных",
            rating: movie.rating?.ratingValue ? movie.rating.ratingValue.toFixed(1) : "Нет данных",
            duration: `${movie.duration || 0} минут`,
            country: movie.country || "Нет данных",
            studio: movie.studio?.studioName || "Нет данных",
            description: movie.description || "Нет описания",
            releaseYear: movie.releaseYear?.toString() || "Нет года выхода",
            genres: movie.genre ? movie.genre.split(',').map(g => g.trim()) : [],
            persons: movie.persons && movie.persons.length > 0
                ? movie.persons.map(p => ({
                      name: p.person.name,
                      role: p.person.role || "Неизвестная роль", // Добавляем роль персоны
                  }))
                : [{ name: "Нет данных", role: "Нет данных" }],
        }));

        const uniqueGenres = Array.from(
            new Set(filteredMovies.flatMap(movie => movie.genre?.split(',') || []).map(g => g.trim()))
        ).filter(Boolean).sort();

        const uniquePersons = Array.from(
            new Set(filteredMovies.flatMap(movie =>
                movie.persons.map(p => p.person.name).sort() // Добавляем роль к имени
            ))
        ).filter(Boolean).sort();

        const uniqueStudios = Array.from(
            new Set(filteredMovies.map(movie => movie.studio?.studioName))
        ).filter(Boolean).sort();

        const uniqueCountries = Array.from(
            new Set(filteredMovies.map(movie => movie.country))
        ).filter(Boolean).sort();

        const uniqueYears = Array.from(
            new Set(filteredMovies.map(movie => movie.releaseYear?.toString()))
        ).filter(Boolean).sort();

        return NextResponse.json({
            movies: formattedMovies,
            filters: {
                genres: uniqueGenres,
                persons: uniquePersons,
                studios: uniqueStudios,
                countries: uniqueCountries,
                years: uniqueYears,
            },
        });
    } catch (error: unknown) {
        console.error('Ошибка при выборке данных:', error);
        return NextResponse.json(
            { error: 'При загрузке данных произошла ошибка' },
            { status: 500 }
        );
    }
}