"use client"; // Обязательно для использования React-хуков в Next.js 13+
import React, { useState, useEffect } from "react";
import { Input, MultiSelect, Button, Select, Textarea } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";
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
    award: { name: "", category: "", awardDate: "" },
    rating: { type: "", reviewCount: "", value: "" },
  });

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sweethcCountry, setSweethcCountry] = useState<boolean>(false);
  const [sweethcLanguage, setSweethcLanguage] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [studios, setStudios] = useState<{ value: string; label: string }[]>([]);
  const [persons, setPersons] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/administration/add/movie/select-data");
      const data = await response.json();
      setCountries(data.countries);
      setLanguages(data.languages);
      setStudios(data.studios);
      setPersons(data.persons);
    };
    fetchData();
  }, []);

  const toggleCountryField = () => {
    setSweethcCountry((sweethcCountry) => !sweethcCountry);
  };

  const toggleLanguageField = () => {
    setSweethcLanguage((sweethcLanguage) => !sweethcLanguage);
  };

  const handleChange = (values: string[]) => {
    setSelectedValues(values);
    setFormData((prev) => ({ ...prev, personIds: values }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAwardChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Award
  ) => {
    setFormData((prev) => ({
      ...prev,
      award: { ...prev.award, [field]: e.target.value },
    }));
  };

  const handleRatingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Rating
  ) => {
    setFormData((prev) => ({
      ...prev,
      rating: { ...prev.rating, [field]: e.target.value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        award: { name: "", category: "", awardDate: "" },
        rating: { type: "", reviewCount: "", value: "" },
      });
      setSelectedValues([]);
      setSearchValue("");
    } else {
      alert("Ошибка при создании фильма.");
    }
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
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Жанр" className="text-amber-50" size="lg">
          <Input
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
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
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
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
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите год"
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
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleCountryField} variant="subtle" color="white" size="lg" leftSection={<IconSelect size={30} />}>
                Выбрать страну
              </Button>
            </div>
          </div>
        )}
        {!sweethcLanguage ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Язык"
              className="text-amber-50"
              placeholder="Выберите язык"
              data={languages}
              value={formData.language}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, language: value || "" }))
              }
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
              }}
            />
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
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button onClick={toggleLanguageField} variant="subtle" color="white" size="lg" leftSection={<IconSelect size={30} />}>
                Выбрать язык
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Поле описания */}
      <div className="flex justify-center">
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
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
          className="text-amber-50"
          size="lg"
          radius="md"
          label="Персона"
          placeholder={!selectedValues.length && !searchValue ? "Выберите персону" : ""}
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
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
            dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
          }}
        />
        <Select
          className="text-amber-50"
          size="lg"
          radius="md"
          allowDeselect
          label="Студия"
          placeholder="Выберите студию"
          data={studios}
          value={formData.studioId}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, studioId: value || "" }))
          }
          styles={{
            input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
            dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
          }}
        />
        <div className="bg-yellow-300 rounded-2xl justify-self-end">
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
        </div>
        <div className="bg-yellow-300 rounded-2xl justify-self-end">
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
        </div>
      </div>
      {/* Блок с наградами */}
      <p className="text-amber-50 text-2xl">Награда</p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-3">
        <Input.Wrapper label="Название награды" className="text-amber-50" size="lg">
          <Input
            name="awardName"
            value={formData.award.name}
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
            value={formData.award.category}
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
            value={formData.award.awardDate}
            onChange={(e) => handleAwardChange(e, "awardDate")}
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
            name="ratingType"
            value={formData.rating.type}
            onChange={(e) => handleRatingChange(e, "type")}
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
            name="reviewCount"
            value={formData.rating.reviewCount}
            onChange={(e) => handleRatingChange(e, "reviewCount")}
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
            name="ratingValue"
            value={formData.rating.value}
            onChange={(e) => handleRatingChange(e, "value")}
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
        <div className="bg-yellow-300 rounded-2xl">
          <Button type="submit" variant="subtle" color="dark.8" size="xl" leftSection={<IconCheck size={30} />}>
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
}