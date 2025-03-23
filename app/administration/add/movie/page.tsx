"use client"; // Обязательно для использования React-хуков в Next.js 13+
import React, { useState } from "react";
import { Input, MultiSelect, Button, Select, Textarea } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

// Интерфейс для данных о наградах
interface Award {
  name: string;
  category: string;
  awardDate: string;
}

// Интерфейс для данных о рейтинге
interface Rating {
  type: string;
  reviewCount: string;
  value: string;
}

export default function AddMovie() {
  // Состояние для хранения выбранных значений
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Состояние для отслеживания текста поиска
  const [searchValue, setSearchValue] = useState<string>("");

  // Обработчик изменения выбранных значений
  const handleChange = (values: string[]) => {
    setSelectedValues(values);
  };

  // Обработчик изменения текста поиска
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="w-full max-w-[75vw] mx-auto mt-10">
      {/* Блок с полями ввода */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        {/* Поле ввода названия фильма */}
        <Input.Wrapper label="Название фильма" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите название фильма"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Жанр" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите жанр"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Длительность в минутах" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите длительность"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Год выпуска" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите год"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Страна" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите страну"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Язык" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите язык"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
      </div>

      {/* Поле описания */}
      <div className="flex justify-center mt-6">
        <Textarea
          className="w-full text-amber-50"
          size="lg"
          radius="md"
          label="Описание"
          placeholder="Введите описание"
          styles={{ input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff", height: "150px" } }}
        />
      </div>

      {/* Блок с выбором персоны и студии */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-6">
        <MultiSelect
          size="lg"
          radius="md"
          label="Персона"
          placeholder={!selectedValues.length && !searchValue ? "Выберите персону" : ""}
          data={["React", "Angular", "Vue", "Svelte"]}
          value={selectedValues} // Текущие выбранные значения
          onChange={handleChange} // Обработчик изменения выбранных значений
          searchValue={searchValue} // Значение поиска
          onSearchChange={handleSearchChange} // Обработчик изменения текста поиска
          nothingFoundMessage={searchValue && !["React", "Angular", "Vue", "Svelte"].includes(searchValue) ? "Ничего не найдено" : null} // Сообщение при отсутствии совпадений
          styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
            dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
          }}
        />
        <Select
          size="lg"
          radius="md"
          allowDeselect
          label="Студия"
          placeholder="Выберите студию"
          data={["React", "Angular", "Vue", "Svelte"]}
          styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
            dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
          }}
        />
        <div className="bg-zinc-800 rounded-2xl justify-self-end">
          <Button component={Link} href="/administration/add/people" variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
            Создать персону
          </Button>
        </div>
        <div className="bg-zinc-800 rounded-2xl justify-self-end">
          <Button component={Link} href="/administration/add/studio" variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
            Создать студию
          </Button>
        </div>
      </div>

      {/* Блок с наградами */}
      <p className="text-amber-50 text-2xl">Награда</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Название награды" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите название награды"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Категория" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите категорию"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Дата награждения" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите дату награждения"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
      </div>

      {/* Блок с рейтингом */}
      <p className="text-amber-50 text-2xl mt-6">Рейтинг</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Тип рейтинга" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите тип рейтинга"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Количество отзывов" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите количество отзывов"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Значение рейтинга" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите значение рейтинга"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
      </div>

      {/* Кнопки действий */}
      <div className="flex justify-center items-center space-x-10 mt-10">
        <div className="bg-zinc-800 rounded-2xl">
          <Button variant="subtle" color="white" size="xl" leftSection={<IconCircleX size={30} />}>
            Сбросить
          </Button>
        </div>
        <div className="bg-yellow-300 rounded-2xl">
          <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconCheck size={30} />}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}