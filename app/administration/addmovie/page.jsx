"use client"; // Обязательно для использования React-хуков в Next.js 13+
import { useState } from "react";
import { Input, MultiSelect, Button, Select, Textarea } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function AddMovie() {
        
  // Состояние для хранения выбранных значений
  const [selectedValues, setSelectedValues] = useState([]);

  // Состояние для отслеживания текста поиска
  const [searchValue, setSearchValue] = useState("");

  // Обработчик изменения выбранных значений
  const handleChange = (values) => {
    setSelectedValues(values);
  };

  // Обработчик изменения текста поиска
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  
  return (
    <div className="mt-10 justify-self-center items-center">
      <div className="grid grid-cols-2 gap-x-15 gap-y-6">
        {/* Поле ввода названия фильма */}
        <Input.Wrapper label="Название фильма" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            className="w-150 text-amber-50"
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
            className="w-150 text-amber-50"
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
            className="w-150 text-amber-50"
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
            className="w-150 text-amber-50"
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
            className="w-150 text-amber-50"
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
            className="w-150 text-amber-50"
            placeholder="Введите язык"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
            />
        </Input.Wrapper>
      </div>
      <div className="flex justify-self-center mt-6">
        <Textarea
            className="w-318 text-amber-50"
            size="lg"
            radius="md"
            label="Описание"
            placeholder="Ввидите описание"
            styles={{ input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff", height: "150px"} }}
            />
      </div>
      <div className="grid grid-cols-2 gap-x-15 gap-y-6 mt-6">
        <MultiSelect
          size="lg"
          radius="md"
          className="w-150 text-amber-50"
          label="Персона"
          placeholder={!selectedValues.length && !searchValue ? "Выберите персону" : ""}
          data= {["React", "Angular", "Vue", "Svelte"]}
          value={selectedValues} // Текущие выбранные значения
          onChange={handleChange} // Обработчик изменения выбранных значений
          searchValue={searchValue} // Значение поиска
          onSearchChange={handleSearchChange} // Обработчик изменения текста поиска
          nothingFoundMessage={searchValue && !data.includes(searchValue) ? "Ничего не найдено" : null} // Сообщение при отсутствии совпадений
          styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
            dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            item: { color: "#71717b" },
            pill: {backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
          }}
        />
        <Select
            size="lg"
            radius="md"
            allowDeselect
            className="w-150 text-amber-50"
            label="Студия"
            placeholder="Выберите студию"
            data={["React", "Angular", "Vue", "Svelte"]}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
        <div className="bg-zinc-800 rounded-2xl justify-self-end">
          <Button component={Link} href="/administration/addpeople" variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
            Создать персону
          </Button>
        </div>
        <div className="bg-zinc-800 rounded-2xl justify-self-end">
          <Button component={Link} href="/administration/addstudio" variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
          Создать студию
          </Button>
        </div>
      </div>
      <p className="text-amber-50 text-2xl">Награда</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Название награды" className="text-amber-50" size="lg">
        <Input
            size="lg"
            radius="md"
            className="w-100 text-amber-50"
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
            className="w-100 text-amber-50"
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
            className="w-100 text-amber-50"
            placeholder="Введите дату награждения"
            styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
            />
        </Input.Wrapper>
        </div>
        <p className="text-amber-50 text-2xl mt-6">Рейтинг</p>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Тип рейтинга" className="text-amber-50" size="lg">
        <Input
            size="lg"
            radius="md"
            className="w-100 text-amber-50"
            placeholder="Ввидите тип рейтинга"
            styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
            />
        </Input.Wrapper>
        <Input.Wrapper label="Количество отзывов" className="text-amber-50" size="lg">
        <Input
            size="lg"
            radius="md"
            className="w-100 text-amber-50"
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
            className="w-100 text-amber-50"
            placeholder="Введите значение рейтинга"
            styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
            />
        </Input.Wrapper>
        </div>
        <div className="flex justify-self-center items-center space-x-10">
            <div className="bg-zinc-800 rounded-2xl justify-self-center mt-10">
                <Button variant="subtle" color="white" size="xl" leftSection={<IconCircleX size={30} />}>
                    Сбросить
                </Button>
            </div>   
            <div className="bg-yellow-300 rounded-2xl justify-self-center mt-10">
                <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconCheck size={30} />}>
                    Сохранить
                </Button>
            </div>   
        </div>   
    </div>
  );
}