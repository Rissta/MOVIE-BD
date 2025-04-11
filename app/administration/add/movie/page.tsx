"use client";
import React, { useState, useEffect } from "react";
import { Input, MultiSelect, Button, Select, Textarea, Loader } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";
import Link from "next/link";
import classesSelect from '/app/components/select.module.css';

interface Award {
  name?: string;
  category?: string;
  awardDate?: string;
}

interface Rating {
  type?: string;
  reviewCount?: string;
  value?: string;
}

export default function AddMovie() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    country: "",
    language: "",
    releaseYear: "",
    description: "",
    studioId: "",
    personIds: [] as string[],
    award: {} as Award,
    rating: {} as Rating,
  });
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sweethcCountry, setSweethcCountry] = useState<boolean>(false);
  const [sweethcLanguage, setSweethcLanguage] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [studios, setStudios] = useState<{ value: string; label: string }[]>([]);
  const [persons, setPersons] = useState<{ value: string; label: string }[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true); // Устанавливаем isLoading в true перед началом загрузки
      const response = await fetch("/api/administration/add/movie/select-data");
      const data = await response.json();
      setCountries(data.countries);
      setLanguages(data.languages);
      setStudios(data.studios);
      setPersons(data.persons);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
    }
  };
  fetchData();
}, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const currentYear = new Date().getFullYear();

    if (!formData.title) newErrors.title = "Название фильма обязательно.";
    if (!formData.genre) newErrors.genre = "Жанр обязателен.";
    if (!formData.duration)
      newErrors.duration = "Длительность обязателена.";
    else if (isNaN(Number(formData.duration)))
      newErrors.duration = "Длительность должна быть числом.";
    else if (Number(formData.duration) < 30)
      newErrors.duration = "Минимальная длительность фильма - 30 минут.";
    if (!formData.country)
      newErrors.country = "Страна обязательна.";
    if (!formData.language) { 
      newErrors.language = "Язык обязателен.";
    } else if (!/^[a-z]{3}$/.test(formData.language)) {
      newErrors.language = "Код языка должен состоять из 3 строчных, англиских букв.";
    }
    if (!formData.releaseYear)
      newErrors.releaseYear = "Год выпуска обязателен.";
    else if (isNaN(Number(formData.releaseYear)))
      newErrors.releaseYear = "Год выпуска должен быть числом.";
    else if (Number(formData.releaseYear) < 1888 || Number(formData.releaseYear) > currentYear)
      newErrors.releaseYear = `Год выпуска должен быть между 1888 и ${currentYear}.`;
    if (!formData.description) newErrors.description = "Описание обязательно.";
    if (!formData.studioId) newErrors.studioId = "Студия обязательна.";
    if (formData.personIds.length === 0)
      newErrors.personIds = "Необходимо выбрать хотя бы одну персону.";

    // Проверка даты награждения
    if (
      formData.award.awardDate &&
      !/^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/.test(formData.award.awardDate)
    ) {
      newErrors.awardDate = "Дата награждения должна быть в формате yyyy.mm.dd";
    }

    // Проверка рейтинга
    if (
      formData.rating.value &&
      !/^\d$|^\d\.\d$/.test(formData.rating.value)
    ) {
      newErrors.ratingValue =
        "Рейтинг должен быть либо целым числом (например, 8), либо числом с одной цифрой в целой и дробной части (например, 9.2).";
    }
    if (
      formData.rating.reviewCount &&
      (isNaN(Number(formData.rating.reviewCount)) || Number(formData.rating.reviewCount) < 0)
    ) {
      newErrors.reviewCount = "Количество отзывов должно быть положительным числом.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsUploading(true);
    try {
      const response = await fetch("/api/administration/add/movie/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Фильм успешно создан!");
        setFormData({
          title: "",
          genre: "",
          duration: "",
          country: "",
          language: "",
          releaseYear: "",
          description: "",
          studioId: "",
          personIds: [],
          award: {},
          rating: {},
        });
        setSelectedValues([]);
        setSearchValue("");
        setErrors({});
      } else {
        alert("Ошибка при создании фильма.");
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      alert("Произошла ошибка при отправке данных.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAwardChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Award
  ) => {
    setFormData((prev) => ({
      ...prev,
      award: { ...prev.award, [field]: e.target.value },
    }));
    setErrors((prev) => ({ ...prev, awardDate: "" }));
  };

  const handleRatingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Rating
  ) => {
    setFormData((prev) => ({
      ...prev,
      rating: { ...prev.rating, [field]: e.target.value },
    }));
    setErrors((prev) => ({ ...prev, ratingValue: "" }));
  };

  const toggleCountryField = () => {
    setSweethcCountry((prev) => !prev);
  };

  const toggleLanguageField = () => {
    setSweethcLanguage((prev) => !prev);
  };

  const handleChange = (values: string[]) => {
    setSelectedValues(values);
    setFormData((prev) => ({ ...prev, personIds: values }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[75vw] mx-auto mt-10">
      {/* Блок с полями ввода */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        {/* Поле ввода названия фильма */}
        <Input.Wrapper label="Название фильма" className="text-amber-50" size="lg">
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите название фильма"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.title ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.title && <p className="text-red-500 h-0">{errors.title}</p>}
        </Input.Wrapper>

        {/* Жанр */}
        <Input.Wrapper label="Жанр" className="text-amber-50" size="lg">
          <Input
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите жанр (драма, комедия)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.genre ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.genre && <p className="text-red-500 h-0">{errors.genre}</p>}
        </Input.Wrapper>

        {/* Длительность */}
        <Input.Wrapper label="Длительность в минутах" className="text-amber-50" size="lg">
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите длительность"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.duration ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.duration && <p className="text-red-500 h-0">{errors.duration}</p>}
        </Input.Wrapper>

        {/* Год выпуска */}
        <Input.Wrapper label="Год выпуска" className="text-amber-50" size="lg">
          <Input
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите год"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.releaseYear ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.releaseYear && <p className="text-red-500 h-0">{errors.releaseYear}</p>}
        </Input.Wrapper>

        {/* Страна */}
        {!sweethcCountry ? (
          <div>
            <Select
              disabled={isLoading}
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
            />
            {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
            {errors.country && <p className="text-red-500 h-0">{errors.country}</p>}
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleCountryField} variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
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
              <Button onClick={toggleCountryField} variant="subtle" color="white" size="lg" leftSection={<IconSelect size={30} />}>
                Выбрать страну
              </Button>
            </div>
          </div>
        )}

        {/* Язык */}
        {!sweethcLanguage ? (
          <div>
            <Select
              disabled={isLoading}
              size="lg"
              radius="md"
              allowDeselect
              label="Язык"
              className="text-amber-50"
              placeholder={isLoading ? "Загрузка..." : "Выберите язык"}
              data={languages}
              value={formData.language}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, language: value || "" }))
              }
              styles={{
                input: {
                  borderColor: errors.language ? "red" : "#27272a",
                }
              }}
              classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
            />
            {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
            {errors.language && <p className="text-red-500 h-0">{errors.language}</p>}
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleLanguageField} variant="subtle" color="white" size="lg" leftSection={<IconPlus size={30} />}>
                Добавить язык
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Input.Wrapper label="Язык" className="text-amber-50" size="lg">
              <Input
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                size="lg"
                radius="md"
                placeholder="Введите язык"
                styles={{
                  input: {
                    backgroundColor: "#27272a",
                    borderColor: errors.language ? "red" : "#27272a",
                    color: "#fff",
                  },
                }}
              />
            </Input.Wrapper>
            {errors.language && <p className="text-red-500 h-0">{errors.language}</p>}
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleLanguageField} variant="subtle" color="white" size="lg" leftSection={<IconSelect size={30} />}>
                Выбрать язык
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Поле описания */}
      <div className="justify-center">
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full text-amber-50"
          size="lg"
          radius="md"
          label="Описание"
          placeholder="Введите описание"
          styles={{
            input: {
              backgroundColor: "#27272a",
              borderColor: errors.description ? "red" : "#27272a",
              color: "#fff",
              height: "150px",
            },
          }}
        />
        {errors.description && <p className="text-red-500 h-0">{errors.description}</p>}
      </div>

      {/* Блок с выбором персоны и студии */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-6">
        <div>
          <MultiSelect
            disabled={isLoading}
            className="text-amber-50"
            size="lg"
            radius="md"
            label="Персона"
            placeholder={ isLoading ? "Загрузка..." : (!selectedValues.length && !searchValue ? "Выберите персону" : "")}
            data={persons}
            value={selectedValues}
            onChange={handleChange}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            nothingFoundMessage={
              searchValue && !persons.some((p) => p.label === searchValue)
                ? "Ничего не найдено"
                : null
            }
            styles={{
              input: { backgroundColor: "#27272a", borderColor: errors.personIds ? "red" : "#27272a", color: "#71717b" },
              pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
            }}
            classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
          />
          {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
          {errors.personIds && <p className="text-red-500 h-0">{errors.personIds}</p>}
        </div>
        <div>
          <Select
            disabled={isLoading}
            className="text-amber-50"
            size="lg"
            radius="md"
            allowDeselect
            label="Студия"
            placeholder={isLoading ? "Загрузка..." : "Выберите студию"}
            data={studios}
            value={formData.studioId}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, studioId: value || "" }))
            }
            styles={{
              input: {
                borderColor: errors.studioId ? "red" : "#27272a",
              }
            }}
            classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}

          />
          {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
          {errors.studioId && <p className="text-red-500 h-0">{errors.studioId}</p>}
        </div>
        {/* <div className="bg-yellow-300 rounded-2xl justify-self-end">
          <Button
            component={Link}
            href="/administration/add/people"
            variant="subtle"
            color="dark.8"
            size="lg"
            leftSection={<IconPlus size={30} />}
          >
            Создать персону
          </Button>
        </div> */}
        {/* <div className="bg-yellow-300 rounded-2xl justify-self-end">
          <Button
            component={Link}
            href="/administration/add/studio"
            variant="subtle"
            color="dark.8"
            size="lg"
            leftSection={<IconPlus size={30} />}
          >
            Создать студию
          </Button>
        </div> */}
      </div>

      {/* Блок с наградами (необязательный) */}
      <p className="text-amber-50 text-2xl mt-6">Награда (необязательно)</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Название награды" className="text-amber-50" size="lg">
          <Input
            name="awardName"
            value={formData.award.name || ""}
            onChange={(e) => handleAwardChange(e, "name")}
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
            name="awardCategory"
            value={formData.award.category || ""}
            onChange={(e) => handleAwardChange(e, "category")}
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
            name="awardDate"
            value={formData.award.awardDate || ""}
            onChange={(e) => handleAwardChange(e, "awardDate")}
            size="lg"
            radius="md"
            placeholder="Введите дату награждения (yyyy.mm.dd)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.awardDate ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.awardDate && <p className="text-red-500 h-0">{errors.awardDate}</p>}
        </Input.Wrapper>
      </div>

      {/* Блок с рейтингом (необязательный) */}
      <p className="text-amber-50 text-2xl mt-6">Рейтинг (необязательно)</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Источник рейтинга" className="text-amber-50" size="lg">
          <Input
            name="ratingType"
            value={formData.rating.type || ""}
            onChange={(e) => handleRatingChange(e, "type")}
            size="lg"
            radius="md"
            placeholder="Введите источник рейтинга (IMDb, Кинопоиск)"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Количество отзывов" className="text-amber-50" size="lg">
          <Input
            name="reviewCount"
            value={formData.rating.reviewCount || ""}
            onChange={(e) => handleRatingChange(e, "reviewCount")}
            size="lg"
            radius="md"
            placeholder="Введите количество отзывов"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.reviewCount ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.reviewCount && <p className="text-red-500 h-0">{errors.reviewCount}</p>}
        </Input.Wrapper>
        <Input.Wrapper label="Значение рейтинга" className="text-amber-50" size="lg">
          <Input
            name="ratingValue"
            value={formData.rating.value || ""}
            onChange={(e) => handleRatingChange(e, "value")}
            size="lg"
            radius="md"
            placeholder="Введите значение рейтинга (8 или 9.2)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.ratingValue ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.ratingValue && <p className="text-red-500 h-0">{errors.ratingValue}</p>}
        </Input.Wrapper>
      </div>

      {/* Кнопки действий */}
      <div className="flex justify-center items-center space-x-10 mt-10">
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