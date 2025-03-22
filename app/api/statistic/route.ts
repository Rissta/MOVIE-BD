import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: NextRequest){
    try {
        //Первый блок статистики с таблицей фильмов
        // const searchParams = request.nextUrl.searchParams;
        const movieCount = await prisma.movie.count();
        const geners = await prisma.movie.findMany({
            select: {
                genre: true,
            },
        });

        const languages = await prisma.movie.findMany({
            select: {
                language: true,
            },
            distinct: ['language'],
        });

        // Разделяем строки с жанрами на отдельные жанры и собираем их в один массив
        const allGenres = geners.map(geners => geners.genre.split(',').map(genre => genre.trim())).flat();
        const uniqueGenres = [...new Set(allGenres)];

        const generCount = uniqueGenres.filter(Boolean).length;
        const languageCount = languages.filter(Boolean).length;

        //Второй блок с людьми
        const personCount = await prisma.person.count();
        const nationalitys = await prisma.person.findMany({
            select: {
                nationality: true,
            },
            distinct: ['nationality'],
        });
        const nationalityCount = nationalitys.filter(Boolean).length;

        //Третий блок со студиями
        const studioCount = await prisma.studio.count();
        const countrys = await prisma.studio.findMany({
            select: {
                country: true,
            },
            distinct: ['country'],
        });
        const countryCount = countrys.filter(Boolean).length;

        //Четвертый блок с таблицей фильмов у студии
        const studiosWithMovieCount = await prisma.studio.findMany({
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
        const formattedStudios = studiosWithMovieCount.map(studio => ({
            studioName: studio.studioName,
            movieCount: studio._count.movies,
        }));

        //Пятый блок с таблицей фильмов у персоны
        const personsWithMovieCount = await prisma.person.findMany({
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
        const formattedPersons = personsWithMovieCount.map(persons => ({
            personName: persons.name,
            movieCount: persons._count.movies,
        }));

        return NextResponse.json({movieCount, generCount, languageCount, personCount, nationalityCount, studioCount, countryCount, formattedStudios, formattedPersons});
    }

    catch (error) {
        console.error('Ошибка при выборке данных:', error);
        return NextResponse.json(
            { error: 'При загрузке данных произошла ошибка' },
            { status: 500 }
        );
    }
}