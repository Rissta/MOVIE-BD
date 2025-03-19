"use client"; // Обязательно для использования React-хуков в Next.js 13+
import { useState } from "react";
import { Input, MultiSelect, Button, Select, Textarea } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus } from "@tabler/icons-react";

export default function AddPeople() {
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
      <div className="grid grid-cols-2 gap-x-17 gap-y-6">
        {/* Поле ввода названия фильма */}
        <Input.Wrapper label="ФИО" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            className="w-150 text-amber-50"
            placeholder="Введите ФИО"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Национальность" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            className="w-150 text-amber-50"
            placeholder="Введите национальность"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Роль" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            className="w-150 text-amber-50"
            placeholder="Введите роль"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Дата рождения" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            className="w-150 text-amber-50"
            placeholder="Введите дату рождения"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
            />
        </Input.Wrapper>
        </div>
        <MultiSelect
          size="lg"
          radius="md"
          className="w-315 text-amber-50 mt-6"
          label="Фильм"
          placeholder={!selectedValues.length && !searchValue ? "Выбрать фильм" : ""}
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