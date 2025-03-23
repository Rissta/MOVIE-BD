"use client"; // Обязательно для использования React-хуков в Next.js 13+
import React, { useState, useEffect } from "react";
import { Input, MultiSelect, Button, Select } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";

// Интерфейс для данных о студии
interface Studio {
  name: string;
  country: string;
  foundationDate: string;
  movieIds: string[];
}

export default function AddStudio() {
  const [formData, setFormData] = useState<Studio>({
    name: "",
    country: "",
    foundationDate: "",
    movieIds: [],
  });

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sweethcCountry, setSweethcCountry] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [movies, setMovies] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/administration/add/studio/select-data");
      const data = await response.json();
      setCountries(data.countries);
      setMovies(data.movies);
    };
    fetchData();
  }, []);

  const toggleCountryField = () => {
    setSweethcCountry((prev) => !prev);
  };

  const handleChange = (values: string[]) => {
    setSelectedValues(values);
    setFormData((prev) => ({ ...prev, movieIds: values }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/administration/add/studio/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Студия успешно создана!");
      setFormData({
        name: "",
        country: "",
        foundationDate: "",
        movieIds: [],
      });
      setSelectedValues([]);
      setSearchValue("");
    } else {
      alert("Ошибка при создании студии.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[75vw] mx-auto mt-10">
      {/* Блок с полями ввода */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        {/* Поле ввода названия студии */}
        <Input.Wrapper label="Название студии" className="text-amber-50" size="lg">
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите название студии"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>

        {!sweethcCountry ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Страна"
              className="text-amber-50"
              placeholder="Выберите страну"
              data={countries}
              value={formData.country}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, country: value || "" }))
              }
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
              }}
            />
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button
                onClick={toggleCountryField}
                variant="subtle"
                color="white"
                size="lg"
                leftSection={<IconPlus size={30} />}
              >
                Добавить страну
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Input.Wrapper label="Страна" className="text-amber-50" size="lg">
              <Input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                size="lg"
                radius="md"
                placeholder="Введите страну"
                styles={{
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button
                onClick={toggleCountryField}
                variant="subtle"
                color="white"
                size="lg"
                leftSection={<IconSelect size={30} />}
              >
                Выбрать страну
              </Button>
            </div>
          </div>
        )}

        <Input.Wrapper label="Дата создания" className="text-amber-50" size="lg">
          <Input
            name="foundationDate"
            value={formData.foundationDate}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите дату создания"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
      </div>

      {/* Выбор фильмов */}
      <MultiSelect
        size="lg"
        radius="md"
        className="w-full text-amber-50"
        label="Фильм"
        placeholder={!selectedValues.length && !searchValue ? "Выбрать фильм" : ""}
        data={movies}
        value={selectedValues}
        onChange={handleChange}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        nothingFoundMessage={
          searchValue && !movies.some((movie) => movie.label === searchValue)
            ? "Ничего не найдено"
            : null
        }
        styles={{
          input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
          dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
          pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
        }}
      />

      {/* Кнопки действий */}
      <div className="flex justify-center items-center space-x-10 mt-10">
        <div className="bg-yellow-300 rounded-2xl">
          <Button type="submit" variant="subtle" color="dark.8" size="xl" leftSection={<IconCheck size={30} />}>
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
}