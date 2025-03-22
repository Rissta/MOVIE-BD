"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Pagination, Select, Text } from "@mantine/core";
import {
  IconLicense,
  IconMessage,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

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
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(false);


  // Состояния для данных
  const [movies, setMovies] = useState<Film[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [persons, setPersons] = useState<string[]>([]);
  const [studios, setStudios] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // Состояние для фильтров
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    person: "",
    studio: "",
    country: "",
    year: "",
    minRating: "",
  });

  // Состояние для пагинации
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;

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
        setIsLoading(true); // Начало загрузки
        const queryParams = new URLSearchParams(filters).toString();
        console.log("Отправляемый запрос:", `/api/search/movie?${queryParams}`);
        const response = await fetch(`/api/search/movie?${queryParams}`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        console.log("Данные от API:", data);

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

const fetchMovies = async () => {
  try {
      setIsLoadingMovie(true); // Начало загрузки
      const queryParams = new URLSearchParams(filters).toString();
      console.log("Отправляемый запрос:", `/api/search/movie?${queryParams}`);
      const response = await fetch(`/api/search/movie?${queryParams}`);
      if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      console.log("Данные от API:", data);

      setMovies(data.movies || []);
  } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
  } finally {
    setIsLoadingMovie(false); // Завершение загрузки
  }
}

useEffect(() => {
    console.log("Фильтры изменились, вызываем fetchData");
    fetchData();
}, [filters]);

useEffect(() => {
    console.log("Текущие фильтры:", filters);
}, [filters]);

  // Обработчик изменений в полях ввода
  const handleInputChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    
    <div className="w-full max-w-[120vw] mx-auto">
      {/* Модальное окно "Описание" */}
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

      {/* Модальное окно "Персоны" */}
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

      {/* Модальное окно "Жанры" */}
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
                  onClick={fetchMovies} // Вызываем fetchData при нажатии
              >
                  Поиск
              </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 mb-10">
        <div className="grid grid-cols-3 gap-x-10 text-2xl">
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Жанр"
            placeholder="Выберите жанр"
            data={genres}
            onChange={(value) => handleInputChange("genre", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Персона"
            placeholder="Выберите персону"
            data={persons}
            onChange={(value) => handleInputChange("person", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            label="Студия"
            placeholder="Выберите студию"
            data={studios}
            onChange={(value) => handleInputChange("studio", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Страна"
            placeholder="Выберите страну"
            data={countries}
            onChange={(value) => handleInputChange("country", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Год"
            placeholder="Выберите год"
            data={years}
            onChange={(value) => handleInputChange("year", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Input.Wrapper label="Рейтинг" size="md">
            <Input
              size="lg"
              radius="md"
              placeholder="От"
              onChange={(e) => handleInputChange("minRating", e.target.value)}
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              }}
            />
          </Input.Wrapper>
        </div>
      </div>

      {/* Блок с данными */}
      {!isLoadingMovie ? 
      <div>
      {currentPageData.map((item) => (
        <div key={item.id} className="ml-15 mr-15 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
          <div className="grid grid-cols-8 gap-x-4 text-2xl text-amber-50 h-18">
            <div className="items-center">
              <p className="font-extralight flex justify-center items-center text-base">Название</p>
              <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.title}</p>
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
      ))}
      {/* Пагинация */}
      <div className="flex justify-center items-center mt-6">
        <Pagination
          total={paginatedData.length} // Общее количество страниц
          value={activePage} // Текущая страница
          onChange={setActivePage} // Обработчик изменения страницы
          color="dark.4"
          size="xl"
          styles={{ dots: { color: "#52525c" } }}
        />
      </div>
      </div>
      : 
      <p className="font-extralight flex justify-center items-center text-2xl text-amber-50">Загрузка...</p>
      }
    </div>
  );
}