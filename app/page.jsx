"use client"; // Обязательно для использования React-хуков в Next.js 13+

import { useState } from "react";
import { Pagination } from "@mantine/core";
import { IconAward, IconBuildings, IconDatabase, IconMovie, IconStar, IconUsersGroup } from "@tabler/icons-react";

export default function statistic() {
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
  const studiosPages = chunk(studiosData, 5);

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
  const personsPages = chunk(personsData, 5);

  // Состояние для отслеживания активной страницы персон
  const [activePersonPage, setActivePersonPage] = useState(1);

  // Получаем данные для текущей страницы персон
  const currentPersonPageData = personsPages[activePersonPage - 1];

  return (
    <div>
      <h1 className="ml-60 mt-6 text-4xl font-bold text-yellow-300">Общая статистика</h1>
      <div className="grid grid-flow-col grid-rows-2 gap-8 ml-60 mt-6 text-2xl mr-60">
        {/* Блок "Фильмы" */}
        <div className="h-48 w-150 bg-zinc-800 text-amber-50 rounded-4xl">
          <div className="flex place-content-between m-4">
            <p className="font-bold text-yellow-300">Фильмы</p>
            <IconMovie className="float-end text-yellow-300 rounded-4xl" size={40} />
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество фильмов</p>
            <p className="text-xl">123</p>
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество жанров</p>
            <p className="text-xl">123</p>
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество языков</p>
            <p className="text-xl">123</p>
          </div>
        </div>

        {/* Остальные блоки (Люди, Студии, Рейтинг, Награды, База данных) */}
        <div className="h-48 w-150 bg-zinc-800 text-amber-50 rounded-4xl">
          <div className="flex place-content-between m-4">
            <p className="font-bold text-yellow-300">Люди</p>
            <IconUsersGroup className="float-end text-yellow-300 rounded-4xl" size={40} />
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество Людей</p>
            <p className="text-xl">123</p>
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество национальностей</p>
            <p className="text-xl">123</p>
          </div>
        </div>

        <div className="h-48 w-150 bg-zinc-800 text-amber-50 rounded-4xl">
          <div className="flex place-content-between m-4">
            <p className="font-bold text-yellow-300">Студии</p>
            <IconBuildings className="float-end text-yellow-300 rounded-4xl" size={40} />
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество студий</p>
            <p className="text-xl">123</p>
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество стран</p>
            <p className="text-xl">123</p>
          </div>
        </div>

        <div className="h-48 w-150 bg-zinc-800 text-amber-50 rounded-4xl">
          <div className="flex place-content-between m-4">
            <p className="font-bold text-yellow-300">Рейтинг</p>
            <IconStar className="float-end text-yellow-300 rounded-4xl" size={40} />
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество отзывов</p>
            <p className="text-xl">123</p>
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Средний рейтинг</p>
            <p className="text-xl">123</p>
          </div>
        </div>

        <div className="h-48 w-150 bg-zinc-800 text-amber-50 rounded-4xl">
          <div className="flex place-content-between m-4">
            <p className="font-bold text-yellow-300">Награды</p>
            <IconAward className="float-end text-yellow-300 rounded-4xl" size={40} />
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество наград</p>
            <p className="text-xl">123</p>
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество категорий</p>
            <p className="text-xl">123</p>
          </div>
        </div>

        <div className="h-48 w-150 bg-zinc-800 text-amber-50 rounded-4xl">
          <div className="flex place-content-between m-4">
            <p className="font-bold text-yellow-300">База данных</p>
            <IconDatabase className="float-end text-yellow-300 rounded-4xl" size={40} />
          </div>
          <div className="flex place-content-between mt-2 mr-4 ml-4">
            <p className="text-xl">Количество записей</p>
            <p className="text-xl">123</p>
          </div>
        </div>
      </div>

      {/* Блок с пагинацией */}
      <div className="grid grid-cols-2 grid-rows-1 gap-8 ml-60 mt-10 text-2xl mr-60">
        {/* Левый блок с пагинацией (студии) */}
        <div className="h-114 w-230 bg-zinc-800 rounded-2xl text-3xl">
          <p className="flex justify-evenly pt-3 pb-3 font-bold text-yellow-300"> Фильмы по студиям </p>
          <div className="flex place-content-between items-center h-13 border-b-3 border-zinc-700 ml-10 mr-10 text-3xl">
            <p className="text-amber-50 text-2xl ml-20">Студия</p>
            <p className="text-amber-50 text-2xl mr-20">Количество фильмов</p>
          </div>
          {/* Отображение данных текущей страницы студий */}
          {currentStudioPageData?.map((item) => (
            <div
              key={item.id}
              className="flex place-content-between items-center h-13 border-b-3 border-zinc-700 ml-20 mr-20"
            >
              <p className="text-amber-50 text-xl ml-10">{item.studio}</p>
              <p className="text-amber-50 text-xl mr-10">{item.moviesCountStudio}</p>
            </div>
          ))}
          {/* Пагинация для студий */}
          <div className="flex justify-evenly items-center h-20">
            <Pagination
              total={studiosPages.length} // Общее количество страниц
              value={activeStudioPage} // Текущая страница
              onChange={setActiveStudioPage} // Обработчик изменения страницы
              size="xl"
              color="dark.4"
              styles={{	dots:{ color: "#52525c"}}}
            />
          </div>
        </div>

        {/* Правый блок с пагинацией (персоны) */}
        <div className="h-114 w-230 bg-zinc-800 rounded-2xl text-3xl">
          <p className="flex justify-evenly pt-3 pb-3 font-bold text-yellow-300"> Фильмы у персон </p>
          <div className="flex place-content-between items-center h-13 border-b-3 border-zinc-700 ml-10 mr-10 text-3xl">
            <p className="text-amber-50 text-2xl ml-20">Персона</p>
            <p className="text-amber-50 text-2xl mr-20">Количество фильмов</p>
          </div>
          {/* Отображение данных текущей страницы персон */}
          {currentPersonPageData?.map((item) => (
            <div
              key={item.id}
              className="flex place-content-between items-center h-13 border-b-3 border-zinc-700 ml-20 mr-20"
            >
              <p className="text-amber-50 text-xl ml-10">{item.person}</p>
              <p className="text-amber-50 text-xl mr-10">{item.moviesCountPerson}</p>
            </div>
          ))}
          {/* Пагинация для персон */}
          <div className="flex justify-evenly items-center h-20">
            <Pagination
              total={personsPages.length} // Общее количество страниц
              value={activePersonPage} // Текущая страница
              onChange={setActivePersonPage} // Обработчик изменения страницы
              size="xl"
              color="dark.4"
              styles={{	dots:{ color: "#52525c"}}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}