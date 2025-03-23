"use client"; // Обязательно для использования React-хуков в Next.js 13+
import React, { useState } from "react";
import { Input, MultiSelect, Button, Select } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";

// Интерфейс для данных о персоне
interface Person {
  name: string;
  nationality: string;
  role: string;
  birthDate: string;
  movies: string[];
}

export default function AddPeople() {
  // Состояние для хранения выбранных значений
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sweethcNationality, setSweethcNationality] = useState<boolean>(false);
  const [sweethcRole, setSweethcRole] = useState<boolean>(false);

  const toggleNationalityField = () => {
    setSweethcNationality((sweethcNationality) => !sweethcNationality);
  };

  const toggleRoleField = () => {
    setSweethcRole((sweethcRole) => !sweethcRole);
  };

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
        {/* Поле ввода ФИО */}
        <Input.Wrapper label="ФИО" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите ФИО"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Дата рождения" className="text-amber-50" size="lg">
          <Input
            size="lg"
            radius="md"
            placeholder="Введите дату рождения"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>




        {!sweethcNationality ?(
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Национальность"
              className="text-amber-50"
              placeholder="Выберите национальность"
              data={["React", "Angular", "Vue", "Svelte"]}
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
              }}
            />
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleNationalityField} variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
              Добавить национальность
              </Button>    
            </div>
          </div>
        ) : (
          <div>
            <Input.Wrapper label="Национальность" className="text-amber-50" size="lg">
              <Input
                size="lg"
                radius="md"
                placeholder="Введите национальность"
                styles={{
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleNationalityField} variant="subtle" color="white" size="lg" leftSection={<IconSelect size={30} />}>
              Выбрать национальность
              </Button>    
            </div>
          </div>
        )}




        {!sweethcRole ?(
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Роль"
              className="text-amber-50"
              placeholder="Выберите роль"
              data={["React", "Angular", "Vue", "Svelte"]}
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
              }}
            />
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleRoleField} variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
              Добавить роль
              </Button>    
            </div>
          </div>
        ) : (
          <div>
            <Input.Wrapper label="Роль" className="text-amber-50" size="lg">
              <Input
                size="lg"
                radius="md"
                placeholder="Введите роль"
                styles={{
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleRoleField} variant="subtle" color="white" size="lg" leftSection={<IconSelect size={30} />}>
              Выбрать роль
              </Button>    
            </div>
          </div>
        )}



        
      </div>

      {/* Выбор фильмов */}
      <MultiSelect
        size="lg"
        radius="md"
        className="w-full text-amber-50"
        label="Фильм"
        placeholder={!selectedValues.length && !searchValue ? "Выбрать фильм" : ""}
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

      {/* Кнопки действий */}
      <div className="flex justify-center items-center space-x-10 mt-10">

        <div className="bg-yellow-300 rounded-2xl">
          <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconCheck size={30} />}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}