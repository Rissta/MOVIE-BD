"use client";

import { useState } from "react";
import { IconAward, IconBuildings, IconDatabase, IconMovie, IconStar, IconUsersGroup } from "@tabler/icons-react";
import { Pagination } from "@mantine/core";

export default function Statistic() {
  // Функция для разбиения массива на чанки
  function chunk(array, size) {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Создаем массив данных для студий
  const studiosData = Array(30)
    .fill(0)
    .map((_, index) => ({
      id: index,
      studio: `Студия ${index + 1}`,
      moviesCountStudio: Math.floor(Math.random() * 50) + 1, // случайное количество фильмов
    }));

  // Разбиваем данные на страницы по 5 элементов на страницу
  const studiosPages = chunk(studiosData, 7);

  // Состояние для отслеживания активной страницы студий
  const [activeStudioPage, setActiveStudioPage] = useState(1);

  // Получаем данные для текущей страницы студий
  const currentStudioPageData = studiosPages[activeStudioPage - 1];

  // Создаем массив данных для персон
  const personsData = Array(30)
    .fill(0)
    .map((_, index) => ({
      id: index,
      person: `Персона ${index + 1}`,
      moviesCountPerson: Math.floor(Math.random() * 50) + 1, // случайное количество фильмов
    }));

  // Разбиваем данные на страницы по 5 элементов на страницу
  const personsPages = chunk(personsData, 7);

  // Состояние для отслеживания активной страницы персон
  const [activePersonPage, setActivePersonPage] = useState(1);

  // Получаем данные для текущей страницы персон
  const currentPersonPageData = personsPages[activePersonPage - 1];

  return (
    <div className="text-amber-50">
      <h1 className="ml-60 mt-6 text-2xl font-bold text-yellow-300">Общая статистика</h1>
      <div className="grid grid-cols-3 gap-8 ml-60 mt-6 mr-60">
        {/* Блок "Фильмы" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Фильмы</p>
            <IconMovie className="text-yellow-300" size={40} />
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество фильмов</p>
            <p className="text-lg">123</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество жанров</p>
            <p className="text-lg">123</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Количество языков</p>
            <p className="text-lg">123</p>
          </div>
        </div>

        {/* Блок "Люди" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Люди</p>
            <IconUsersGroup className="text-yellow-300" size={40} />
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество людей</p>
            <p className="text-lg">123</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Количество национальностей</p>
            <p className="text-lg">123</p>
          </div>
        </div>

        {/* Блок "Студии" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Студии</p>
            <IconBuildings className="text-yellow-300" size={40} />
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Количество студий</p>
            <p className="text-lg">123</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Количество стран</p>
            <p className="text-lg">123</p>
          </div>
        </div>
      </div>

      {/* Блок с пагинацией */}
      <div className="grid grid-cols-2 gap-8 ml-60 mt-10 mr-60">
        {/* Левый блок с пагинацией (студии) */}
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">Фильмы по студиям</p>
          <div className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
            <p className="text-amber-50 text-xl ml-4">Студия</p>
            <p className="text-amber-50 text-xl mr-4">Количество фильмов</p>
          </div>
          {currentStudioPageData?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
              <p className="text-amber-50 text-base ml-4">{item.studio}</p>
              <p className="text-amber-50 text-base mr-4">{item.moviesCountStudio}</p>
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
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">Фильмы у персон</p>
          <div className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
            <p className="text-amber-50 text-xl ml-4">Персона</p>
            <p className="text-amber-50 text-xl mr-4">Количество фильмов</p>
          </div>
          {currentPersonPageData?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b-3 border-zinc-700 py-2">
              <p className="text-amber-50 text-base ml-4">{item.person}</p>
              <p className="text-amber-50 text-base mr-4">{item.moviesCountPerson}</p>
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