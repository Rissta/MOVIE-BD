"use client"; // Обязательно для использования React-хуков в Next.js 13+

import { useState } from "react";
import { Button, Input, Pagination, Select, Text } from "@mantine/core";
import {
  IconFilter,
  IconFilterOff,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export default function AwardDirectory() {
  // Пример данных о наградах
  const rawAwardData = Array(30)
    .fill(0)
    .map((_, index) => ({
      id: index,
      awardName: `Награда ${index + 1}`,
      category: ["Лучший фильм", "Лучшая режиссура", "Лучшая актерская игра", "Лучший сценарий"][Math.floor(Math.random() * 4)],
      awardDate: `${Math.floor(Math.random() * 28 + 1)}.${Math.floor(Math.random() * 12 + 1)}.${Math.floor(Math.random() * 50 + 1950)}`,
      movie: ["Фильм 1", "Фильм 2", "Фильм 3", "Фильм 4"][Math.floor(Math.random() * 4)],
    }));

  // Функция для разбиения массива на страницы
  function chunk(array, size) {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Разбиваем данные на страницы по 6 элементов
  const awardData = chunk(rawAwardData, 6);

  // Состояние для отслеживания активной страницы
  const [activePage, setActivePage] = useState(1);

  // Данные текущей страницы
  const currentPageData = awardData[activePage - 1];

  return (
    <div className="w-full max-w-[120vw] mx-auto">
      {/* Основная часть интерфейса */}
      <div className="mt-12">
        <div className="flex justify-center items-center">
          <div className="w-1/3">
            <Input
              radius={20}
              size="xl"
              placeholder="Поиск по категории награды"
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

      <div className="flex justify-center items-center mt-6">
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-2xl">
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Категория"
            placeholder="Выберите категорию"
            data={["Лучший фильм", "Лучшая режиссура", "Лучшая актерская игра", "Лучший сценарий"]}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
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
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 mb-6">
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
        {currentPageData?.map((award) => (
          <div key={award.id} className="ml-10 mr-10 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
            <div className="grid grid-cols-4 gap-x-4 text-2xl text-amber-50 h-auto">
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Название награды</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{award.awardName}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Категория</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{award.category}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Дата награждения</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{award.awardDate}</p>
              </div>
              <div className="items-center">
                <p className="font-extralight flex justify-center items-center text-base">Фильм</p>
                <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{award.movie}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center items-center mt-6">
        <Pagination
          total={awardData.length} // Общее количество страниц
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