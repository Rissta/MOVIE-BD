"use client";
import React, { useState, useEffect } from "react";
import { IconAward, IconBuildings, IconDatabase, IconMovie, IconStar, IconUsersGroup } from "@tabler/icons-react";
import { Pagination } from "@mantine/core";

// Определяем интерфейсы для данных
interface Studio {
  studioName: string;
  movieCount: number;
}

interface Person {
  personName: string;
  movieCount: number;
}

export default function Statistic() {
  // Состояния для хранения данных
  const [movieCount, setMovieCount] = useState<number>(0);
  const [genreCount, setGenreCount] = useState<number>(0);
  const [languageCount, setLanguageCount] = useState<number>(0);
  const [personCount, setPersonCount] = useState<number>(0);
  const [nationalityCount, setNationalityCount] = useState<number>(0);
  const [studioCount, setStudioCount] = useState<number>(0);
  const [countryCount, setCountryCount] = useState<number>(0);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);

  // Функция для разбиения массива на страницы
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Состояние для отслеживания активной страницы студий
  const [activeStudioPage, setActiveStudioPage] = useState<number>(1);
  const studiosPages: Studio[][] = chunk(studios, 7);
  const currentStudioPageData: Studio[] | undefined = studiosPages[activeStudioPage - 1];

  // Состояние для отслеживания активной страницы персон
  const [activePersonPage, setActivePersonPage] = useState<number>(1);
  const personsPages: Person[][] = chunk(persons, 7);
  const currentPersonPageData: Person[] | undefined = personsPages[activePersonPage - 1];

  // Эффект для загрузки данных из API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statistic");
        if (!response.ok) {
          throw new Error("Не удалось получить данные");
        }
        const data = await response.json();

        // Установка данных в состояние
        setMovieCount(data.movieCount);
        setGenreCount(data.generCount);
        setLanguageCount(data.languageCount);
        setPersonCount(data.personCount);
        setNationalityCount(data.nationalityCount);
        setStudioCount(data.studioCount);
        setCountryCount(data.countryCount);
        setStudios(data.formattedStudios);
        setPersons(data.formattedPersons);
      } catch (error) {
        console.error("Ошибка при выборке данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-amber-50">
      <h1 className="ml-60 mt-6 text-2xl font-bold text-yellow-300">Общая статистика</h1>
      <div className="grid grid-cols-3 gap-8 ml-60 mt-6 mr-60">
        {/* Блок "Фильмы" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4 shadow-xl shadow-zinc-500/20">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Фильмы</p>
            <IconMovie className="text-yellow-300" size={40} />
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество фильмов</p>
            <p className="text-lg">{movieCount}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество жанров</p>
            <p className="text-lg">{genreCount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Количество языков</p>
            <p className="text-lg">{languageCount}</p>
          </div>
        </div>

        {/* Блок "Люди" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4 shadow-xl shadow-zinc-500/20">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Люди</p>
            <IconUsersGroup className="text-yellow-300" size={40} />
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество людей</p>
            <p className="text-lg">{personCount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Количество национальностей</p>
            <p className="text-lg">{nationalityCount}</p>
          </div>
        </div>

        {/* Блок "Студии" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4 shadow-xl shadow-zinc-500/20">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Студии</p>
            <IconBuildings className="text-yellow-300" size={40} />
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество студий</p>
            <p className="text-lg">{studioCount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Количество стран</p>
            <p className="text-lg">{countryCount}</p>
          </div>
        </div>
      </div>

      {/* Блок с пагинацией */}
      <div className="grid grid-cols-2 gap-8 ml-60 mt-10 mr-60">
        {/* Левый блок с пагинацией (студии) */}
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4 shadow-xl shadow-zinc-500/20">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">Фильмы по студиям</p>
          <div className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
            <p className="text-amber-50 text-xl ml-4">Студия</p>
            <p className="text-amber-50 text-xl mr-4">Количество фильмов</p>
          </div>
          {currentStudioPageData?.map((item) => (
            <div key={item.studioName} className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
              <p className="text-amber-50 text-base ml-4">{item.studioName}</p>
              <p className="text-amber-50 text-base mr-4">{item.movieCount}</p>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Pagination
              total={studiosPages.length}
              value={activeStudioPage}
              onChange={setActiveStudioPage}
              size="lg"
              color="dark.4"
              styles={{ dots: { color: "#52525c" } }}
            />
          </div>
        </div>

        {/* Правый блок с пагинацией (персоны) */}
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4 shadow-xl shadow-zinc-500/20">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">Фильмы у персон</p>
          <div className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
            <p className="text-amber-50 text-xl ml-4">Персона</p>
            <p className="text-amber-50 text-xl mr-4">Количество фильмов</p>
          </div>
          {currentPersonPageData?.map((item) => (
            <div key={item.personName} className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
              <p className="text-amber-50 text-base ml-4">{item.personName}</p>
              <p className="text-amber-50 text-base mr-4">{item.movieCount}</p>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Pagination
              total={personsPages.length}
              value={activePersonPage}
              onChange={setActivePersonPage}
              size="lg"
              color="dark.4"
              styles={{ dots: { color: "#52525c" } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}