"use client"; // Обязательно для использования React-хуков в Next.js 13+

import React, { useState } from "react";
import { Button, Input, Modal, Pagination, Select, Text } from "@mantine/core";
import {
  IconFilter,
  IconFilterOff,
  IconMovie,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

// Интерфейс для данных о людях
interface Person {
  id: number;
  name: string;
  nationality: string;
  role: string;
  birthDate: string;
  movies: string[];
}

export default function Search() {
  // Состояния для модальных окон
  const [openedMovies, { open: openMovies, close: closeMovies }] = useDisclosure(false);

  // Пример данных о людях с типизацией
  const rawPersonData: Person[] = Array(30)
    .fill(0)
    .map((_, index) => ({
      id: index,
      name: `Человек ${index + 1}`,
      nationality: ["Россия", "США", "Китай", "Индия"][Math.floor(Math.random() * 4)],
      role: ["Режиссер", "Актер", "Продюсер", "Сценарист"][Math.floor(Math.random() * 4)],
      birthDate: `${Math.floor(Math.random() * 28 + 1)}.${Math.floor(Math.random() * 12 + 1)}.${Math.floor(Math.random() * 50 + 1950)}`,
      movies: ["Фильм 1", "Фильм 2", "Фильм 3", "Фильм 4"].filter(() => Math.random() > 0.5),
    }));

  // Функция для разбиения массива на страницы
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Разбиваем данные на страницы по 6 элементов
  const personData: Person[][] = chunk(rawPersonData, 6);

  // Состояние для отслеживания активной страницы
  const [activePage, setActivePage] = useState<number>(1);

  // Данные текущей страницы
  const currentPageData: Person[] | undefined = personData[activePage - 1];

  // Состояние для выбранного человека
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <div className="w-full max-w-[120vw] mx-auto">
      {/* Модальное окно "Название фильма" */}
      <Modal
        opened={openedMovies}
        onClose={closeMovies}
        title="Фильмы персоны"
        centered
        size="xl"
        radius={"lg"}
        styles={{
          header: { backgroundColor: "#27272a" },
          title: { color: "#c0c0c4", backgroundColor: "#27272a", fontSize: "25px" },
          body: { backgroundColor: "#27272a", color: "#c0c0c4", fontSize: "20px" },
        }}
      >
        <Text size="lg" style={{ color: "#c0c0c4" }}>
          {selectedPerson?.movies.length ? (
            selectedPerson.movies.map((film, index) => (
              <div key={index}>
                <p>{film}</p>
              </div>
            ))
          ) : (
            <p>Нет фильмов</p>
          )}
        </Text>
      </Modal>

      {/* Основная часть интерфейса */}
      <div className="mt-12">
        <div className="flex justify-center items-center">
          <div className="w-1/3">
            <Input
              radius={20}
              size="xl"
              placeholder="Поиск по ФИО"
              leftSection={<IconSearch size={30} />}
            />
          </div>
          <div className="bg-yellow-300 rounded-2xl ml-6">
            <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconSearch size={30} />}>
              Поиск
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 mb-10">
        <div className="grid grid-cols-3 gap-x-10 gap-y-6 text-2xl">
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Фильм"
            placeholder="Выберите фильм"
            data={["Фильм 1", "Фильм 2", "Фильм 3", "Фильм 4"]}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Роль"
            placeholder="Выберите роль"
            data={["Режиссер", "Актер", "Продюсер", "Сценарист"]}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            label="Национальность"
            placeholder="Выберите национальность"
            data={["Россия", "США", "Китай", "Индия"]}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
        </div>
      </div>

      {/* <div className="flex justify-center items-center mt-8 mb-6">
        <div className="bg-zinc-800 rounded-2xl">
          <Button variant="subtle" color="white" size="lg" leftSection={<IconFilterOff size={30} />}>
            Сбросить фильтр
          </Button>
        </div>
        <div className="bg-yellow-300 rounded-2xl ml-8">
          <Button variant="subtle" color="dark.8" size="lg" leftSection={<IconFilter size={30} />}>
            Применить фильтр
          </Button>
        </div>
      </div> */}

      {/* Блок с данными */}
      <div>
        {currentPageData?.map((item) => (
          <div key={item.id} className="ml-15 mr-15 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
            <div className="grid grid-cols-5 gap-x-4 text-2xl text-amber-50 h-18">
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">ФИО</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.name}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Национальность</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.nationality}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Роль</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.role}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Дата рождения</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.birthDate}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Список фильмов</p>
                <div className="flex justify-center">
                  <div className="bg-zinc-900 rounded-2xl mt-3">
                    <Button
                      size="base"
                      variant="subtle"
                      color="white"
                      radius="xl"
                      onClick={() => {
                        setSelectedPerson(item);
                        openMovies();
                      }}
                    >
                      <IconMovie size={30} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center items-center mt-6">
        <Pagination
          total={personData.length} // Общее количество страниц
          value={activePage} // Текущая страница
          onChange={setActivePage} // Обработчик изменения страницы
          color="dark.4"
          size="xl"
          styles={{ dots: { color: "#52525c" } }}
        />
      </div>
    </div>
  );
}