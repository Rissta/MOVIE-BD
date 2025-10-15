"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Loader, Modal, Pagination, Select, Text } from "@mantine/core";
import {
  IconFilterOff,
  IconLicense,
  IconMessage,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import classes from '/app/components/pagination.module.css';
import classesSelect from '/app/components/select.module.css';

// Интерфейсы для типизации данных
interface Person {
  name: string;
  role: string;
}
interface Film {
  id: number;
  title: string;
  rating: string;
  duration: string;
  country: string;
  studio: string;
  description: string;
  genres: string[];
  persons: Person[];
}

export default function Search() {
  // Состояния модальных окон
  const [openedDescription, { open: openDescription, close: closeDescription }] = useDisclosure(false);
  const [openedPersons, { open: openPersons, close: closePersons }] = useDisclosure(false);
  const [openedGenres, { open: openGenres, close: closeGenres }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Состояния для данных
  const [movies, setMovies] = useState<Film[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [persons, setPersons] = useState<string[]>([]);
  const [studios, setStudios] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // Состояние для ошибки рейтинга
  const [ratingError, setRatingError] = useState<string | null>(null);

  // Состояние для фильтров
  const [filters, setFilters] = useState<{
    title: string | null;
    genre: string | null;
    person: string | null;
    studio: string | null;
    country: string | null;
    year: string | null;
    minRating: string | null;
  }>({
    title: null,
    genre: null,
    person: null,
    studio: null,
    country: null,
    year: null,
    minRating: null,
  });

  // Функция для очистки фильтров
  const clearFilters = () => {
    setFilters({
      title: null,
      genre: null,
      person: null,
      studio: null,
      country: null,
      year: null,
      minRating: null,
    });
    setRatingError(null); // Очищаем ошибку рейтинга
  };

  // Функция для проверки корректности рейтинга
  const validateRating = (value: string): boolean => {
    const ratingRegex = /^(?:\d(\.\d?)?)?$/; // Разрешаем числа формата "7", "7.", "7.6"
    return ratingRegex.test(value);
  };

  // Обработчик изменения значения рейтинга
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || validateRating(value)) {
      setRatingError(null); // Очищаем ошибку, если значение корректно
    } else {
      setRatingError("Некорректный формат рейтинга (например, '7', '7.', '7.6')");
    }

    handleInputChange("minRating", value);
  };

  // Состояние для пагинации
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 6;

  // Функция для разбиения массива на страницы
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Разбиваем данные на страницы
  const paginatedData = chunk(movies, itemsPerPage);
  const currentPageData = paginatedData[activePage - 1] || [];

  // Состояние для выбранного фильма
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const fetchData = async () => {
    try {
      setActivePage(1);
      setIsLoading(true); // Начало загрузки
  
      // Преобразуем null в пустые строки для запроса
      const queryParams = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          acc[key] = value ?? ""; // Преобразуем null в пустую строку
          return acc;
        }, {} as Record<string, string>)
      ).toString();
  
      console.log("Отправляемый запрос:", `/api/search/movie?${queryParams}`);
      const response = await fetch(`/api/search/movie?${queryParams}`);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      console.log("Данные от API:", data);
  
      setMovies(data.movies || []);
      setGenres(data.filters.genres || []);
      setPersons(data.filters.persons || []);
      setStudios(data.filters.studios || []);
      setCountries(data.filters.countries || []);
      setYears(data.filters.years || []);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };

  useEffect(() => {
    console.log("Фильтры изменились, вызываем fetchData");
    fetchData();
  }, [filters]);

  useEffect(() => {
    console.log("Текущие фильтры:", filters);
  }, [filters]);

  // Обработчик изменений в полях ввода
  const handleInputChange = (field: string, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value === "" ? null : value, // Преобразуем пустую строку в null
    }));
  };

  return (
    <div className="w-full max-w-[120vw] mx-auto">
      {/* Модальные окна */}
      <Modal
        opened={openedDescription}
        onClose={closeDescription}
        title="Описание"
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
          {selectedFilm?.description || "Нет описания"}
        </Text>
      </Modal>

      <Modal
        opened={openedPersons}
        onClose={closePersons}
        title="Персоны"
        centered
        size="xl"
        radius={"lg"}
        styles={{
          header: { backgroundColor: "#27272a" },
          title: { color: "#c0c0c4", backgroundColor: "#27272a", fontSize: "25px" },
          body: { backgroundColor: "#27272a", color: "#c0c0c4", fontSize: "20px" },
        }}
      >
        <div>
          {selectedFilm?.persons.map((person, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <Text size="lg" style={{ color: "#c0c0c4" }}>
                {person.name}
              </Text>
              <Text size="md" style={{ color: "#888888" }}>
                {person.role}
              </Text>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        opened={openedGenres}
        onClose={closeGenres}
        title="Жанры"
        centered
        size="xl"
        radius={"lg"}
        styles={{
          header: { backgroundColor: "#27272a" },
          title: { color: "#c0c0c4", backgroundColor: "#27272a", fontSize: "25px" },
          body: { backgroundColor: "#27272a", color: "#c0c0c4", fontSize: "20px" },
        }}
      >
        <div>
          <Text size="lg" style={{ color: "#c0c0c4" }}>
            {selectedFilm?.genres.join(", ") || "Нет жанров"}
          </Text>
        </div>
      </Modal>

      {/* Основная часть интерфейса */}
      <div className="mt-12">
        <div className="flex justify-center items-center">
          <div className="w-1/3">
            <Input
              radius={20}
              size="xl"
              placeholder="Поиск по названию"
              leftSection={<IconSearch size={30} />}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="bg-yellow-300 rounded-2xl ml-6">
            <Button
              variant="subtle"
              color="dark.8"
              size="xl"
              leftSection={<IconSearch size={30} />}
              onClick={fetchData}
            >
              Поиск
            </Button>
          </div>
          <div className="bg-zinc-800 rounded-2xl ml-6">
            <Button
              variant="subtle"
              color="white"
              size="xl"
              onClick={clearFilters}
              leftSection={<IconFilterOff size={30} />}
            >
              Очистить фильтр
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 mb-10">
        <div className="grid grid-cols-3 gap-x-10 gap-y-5 text-2xl">
          <Select
            className="text-amber-50"
            size="lg"
            radius="md"
            allowDeselect
            label="Жанр"
            placeholder="Выберите жанр"
            data={genres}
            value={filters.genre}
            disabled={isLoading}
            onChange={(value) => handleInputChange("genre", value || "")}
            classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
          />
          <Select
            className="text-amber-50"
            size="lg"
            radius="md"
            allowDeselect
            label="Год"
            placeholder="Выберите год"
            data={years}
            value={filters.year}
            disabled={isLoading}
            onChange={(value) => handleInputChange("year", value || "")}
            classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
          />
          <Select
            className="text-amber-50"
            size="lg"
            radius="md"
            allowDeselect
            label="Страна"
            placeholder="Выберите страну"
            data={countries}
            value={filters.country}
            disabled={isLoading}
            onChange={(value) => handleInputChange("country", value || "")}
            classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
          />
        </div>
      </div>

      {/* Блок с данными */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-6">
            <p className="font-extralight flex justify-center items-center text-2xl text-amber-50">Загрузка</p>
            <Loader color="yellow" size="md" className="ml-2" />
          </div>
        ) : currentPageData.length > 0 ? (
          currentPageData.map((item) => (
            <div key={item.id} className="ml-15 mr-15 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
              <div className="grid grid-cols-8 gap-x-4 text-2xl text-amber-50 h-18">
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Название</p>
                  <p className="h-9 flex justify-center items-center rounded-2xl text-base mt-3 text-center">{item.title}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Рейтинг</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.rating}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Длительность</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.duration}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Страна</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.country}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Студия</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.studio}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Жанры</p>
                  <div className="flex justify-center">
                    <div className="bg-zinc-900 rounded-2xl mt-3">
                      <Button
                        size="base"
                        variant="subtle"
                        color="white"
                        radius="lg"
                        onClick={() => {
                          setSelectedFilm(item);
                          openGenres();
                        }}
                      >
                        <IconLicense size={30} />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Персоны</p>
                  <div className="flex justify-center">
                    <div className="bg-zinc-900 rounded-2xl mt-3">
                      <Button
                        size="base"
                        variant="subtle"
                        color="white"
                        radius="lg"
                        onClick={() => {
                          setSelectedFilm(item);
                          openPersons();
                        }}
                      >
                        <IconUsersGroup size={30} />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Описание</p>
                  <div className="flex justify-center">
                    <div className="bg-zinc-900 rounded-2xl mt-3">
                      <Button
                        size="base"
                        variant="subtle"
                        color="white"
                        onClick={() => {
                          setSelectedFilm(item);
                          openDescription();
                        }}
                        radius="lg"
                      >
                        <IconMessage size={30} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center mt-6">
            <Text size="lg" style={{ color: "#c0c0c4" }}>
              Нет данных для отображения
            </Text>
          </div>
        )}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center items-center mt-6">
        <Pagination
          total={paginatedData.length} // Общее количество страниц
          value={activePage} // Текущая страница
          onChange={setActivePage} // Обработчик изменения страницы
          size="xl"
          classNames={{control: classes.paginationControls}}
          styles={{ dots: { color: "#52525c" } }}
        />
      </div>
    </div>
  );
}