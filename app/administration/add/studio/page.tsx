"use client";
import React, { useState, useEffect } from "react";
import { Input, MultiSelect, Button, Select, Loader } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";
import classesSelect from '/app/components/select.module.css';

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
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Новое состояние для загрузки данных
  const [errors, setErrors] = useState<Record<string, string>>({}); // Ошибки валидации

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/administration/add/studio/select-data");
        const data = await response.json();
        setCountries(data.countries);
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const currentYear = new Date().getFullYear();

    if (!formData.name) newErrors.name = "Название студии обязательно.";
    if (!formData.country) newErrors.country = "Страна обязательна.";
    // if (!formData.foundationDate || !/^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/.test(formData.foundationDate))
    //   newErrors.foundationDate = "Дата должна быть в формате yyyy.mm.dd";
    
    if (!formData.foundationDate || isNaN(Number(formData.foundationDate)))
      newErrors.foundationDate = "Год создания обязателен.";
    else if (Number(formData.foundationDate) < 1893 || Number(formData.foundationDate) > currentYear)
      newErrors.foundationDate = `Год создания должен быть между 1893 и ${currentYear}.`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUploading(true);
    try {
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
        setErrors({});
      } else {
        alert("Ошибка при создании студии.");
      }
    } catch (error) {
      console.error("Error creating studio:", error);
      alert("Произошла ошибка при отправке данных.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.name ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.name && <p className="text-red-500 h-0">{errors.name}</p>}
        </Input.Wrapper>

        {/* Страна */}
        {!sweethcCountry ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Страна"
              className="text-amber-50"
              placeholder={isLoading ? "Загрузка..." : "Выберите страну"}
              data={countries}
              value={formData.country}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, country: value || "" }))
              }
              styles={{
                input: {
                  borderColor: errors.country ? "red" : "#27272a",
                }
              }}
              classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
            {errors.country && <p className="text-red-500 h-0">{errors.country}</p>}
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
                  input: {
                    backgroundColor: "#27272a",
                    borderColor: errors.country ? "red" : "#27272a",
                    color: "#fff",
                  },
                }}
              />
            </Input.Wrapper>
            {errors.country && <p className="text-red-500 h-0">{errors.country}</p>}
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

        {/* Год создания */}
        <Input.Wrapper label="Год создания" className="text-amber-50" size="lg">
          <Input
            name="foundationDate"
            value={formData.foundationDate}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите год создания"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.foundationDate ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.foundationDate && (
            <p className="text-red-500 h-0">{errors.foundationDate}</p>
          )}
        </Input.Wrapper>
      </div>

      {/* Выбор фильмов */}
      <MultiSelect
        disabled={isLoading}
        size="lg"
        radius="md"
        className="w-full text-amber-50"
        label="Фильм (необязательно)"
        placeholder={ isLoading ? "Загрузка..." : (!selectedValues.length && !searchValue ? "Выбрать фильм" : "")}
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
          pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
        }}
        classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
      />
      {isLoading && (
        <div className="flex justify-center mt-2 h-0">
          <Loader size="sm" color="yellow" />
        </div>
      )}
      {/* Кнопки действий */}
      <div className="flex justify-center items-center space-x-10 mt-8">
        <div className="bg-yellow-300 rounded-2xl">
          <Button
            type="submit"
            disabled={isUploading}
            variant="subtle"
            color="dark.8"
            size="xl"
            radius="lg"
          >
            {!isUploading ? (
              <div className="flex items-center">
                <p>Сохранить</p>
                <IconCheck size={30} />
              </div>
            ) : (
              <div className="flex items-center">
                <p>Сохранение</p>
                <Loader color="dark" size="md" className="ml-2" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}