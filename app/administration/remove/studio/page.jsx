"use client"; // Обязательно для использования React-хуков в Next.js 13+

import { useState } from "react";
import { Button, Input, Modal, Pagination, Select, Text } from "@mantine/core";
import {
  IconFilter,
  IconFilterOff,
  IconMovie,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export default function StudioDirectory() {
  // Состояния для модальных окон
  const [openedMovies, { open: openMovies, close: closeMovies }] = useDisclosure(false);

  // Пример данных о студиях
  const rawStudioData = Array(30)
    .fill(0)
    .map((_, index) => ({
      id: index,
      studioName: `Студия ${index + 1}`,
      country: ["Россия", "США", "Китай", "Индия"][Math.floor(Math.random() * 4)],
      foundationDate: `${Math.floor(Math.random() * 28 + 1)}.${Math.floor(Math.random() * 12 + 1)}.${Math.floor(Math.random() * 50 + 1950)}`,
      movies: ["Фильм 1", "Фильм 2", "Фильм 3", "Фильм 4"].filter(() => Math.random() > 0.5),
    }));

  // Функция для разбиения массива на страницы
  function chunk(array, size) {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Разбиваем данные на страницы по 6 элементов
  const studioData = chunk(rawStudioData, 6);

  // Состояние для отслеживания активной страницы
  const [activePage, setActivePage] = useState(1);

  // Данные текущей страницы
  const currentPageData = studioData[activePage - 1];

  // Состояние для выбранной студии
  const [selectedStudio, setSelectedStudio] = useState(null);

  return (
    <div>
      {/* Модальное окно "Фильмы студии" */}
      <Modal
        opened={openedMovies}
        onClose={closeMovies}
        title="Фильмы студии"
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
          {selectedStudio?.movies.length > 0
            ? selectedStudio.movies.map((film, index) => (
                <div key={index}>
                  <p>{film}</p>
                </div>
              ))
            : "Нет фильмов"}
        </Text>
      </Modal>

      {/* Основная часть интерфейса */}
      <div className="mt-12 ml-180 mr-180">
        <div className="flex">
          <div className="w-220">
            <Input
              radius={20}
              size="xl"
              placeholder="Поиск по названию студии"
              leftSection={<IconSearch size={30} />}
            />
          </div>
          <div className="bg-yellow-300 rounded-2xl float-end ml-6">
            <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconSearch size={30} />}>
              Поиск
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-self-center items-center">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-2xl mt-6">
            <Select
            size="lg"
            radius="md"
            allowDeselect
            className="w-150 text-amber-50"
            label="Фильм"
            placeholder="Выберите название фильма"
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
            className="w-150 text-amber-50"
            label="Страна"
            placeholder="Выберите страну"
            data={["Россия", "США", "Китай", "Индия"]}
            styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
            />
        </div>
      </div>
      <div className="flex justify-self-center items-center mt-8 mb-6">
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
      </div>

      {/* Блок с данными */}
      <div>
        {currentPageData?.map((studio) => (
          <div key={studio.id} className="ml-65 mr-65 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
            <div className="grid grid-cols-5 gap-x-4 text-2xl text-amber-50 h-18">
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Название студии</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{studio.studioName}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Страна</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{studio.country}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Дата создания</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{studio.foundationDate}</p>
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
                        setSelectedStudio(studio);
                        openMovies();
                      }}
                    >
                      <IconMovie size={30} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-yellow-300 rounded-4xl">
                  <Button
                    size="lg"
                    variant="subtle"
                    color="dark.8"
                    radius="xl"
                  >
                    <IconX size={35} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-evenly items-center mt-6">
        <Pagination
          total={studioData.length} // Общее количество страниц
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