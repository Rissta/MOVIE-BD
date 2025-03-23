"use client"; // Обязательно для использования React-хуков в Next.js 13+

import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Pagination, Select, Text, Loader } from "@mantine/core";
import {
  IconFilter,
  IconFilterOff,
  IconMovie,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

// Интерфейс для данных о людях
interface Person {
  id: number;
  name: string;
  nationality: string;
  role: string;
  birthDate: string;
  movies: string[];
}

export default function Search() {
  // Состояния модальных окон
  const [openedMovies, { open: openMovies, close: closeMovies }] = useDisclosure(false);

  // Состояния для данных
  const [persons, setPersons] = useState<Person[]>([]);
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [movies, setMovies] = useState<string[]>([]);

  // Состояние для фильтров
  const [filters, setFilters] = useState({
    name: "",
    nationality: "",
    role: "",
    movie: "",
  });

  // Состояние для пагинации
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки
  const itemsPerPage = 6;

  // Функция для разбиения массива на страницы
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Разбиваем данные на страницы
  const paginatedData = chunk(persons, itemsPerPage);
  const currentPageData = paginatedData[activePage - 1] || [];

  // Состояние для выбранного человека
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Загрузка данных из API
  const fetchData = async () => {
    try {
      setIsLoading(true); // Начало загрузки
      const queryParams = new URLSearchParams(filters).toString();
      console.log("Отправляемый запрос:", `/api/search/people?${queryParams}`);
      const response = await fetch(`/api/search/people?${queryParams}`);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      console.log("Данные от API:", data);

      setPersons(data.persons || []);
      setNationalities(data.filters.nationalities || []);
      setRoles(data.filters.roles || []);
      setMovies(data.filters.movies || []);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };

  // Обновление фильтров и загрузка данных
  useEffect(() => {
    fetchData();
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
    {/* Модальное окно "Фильмы персоны" */}
    <Modal
      opened={openedMovies}
      onClose={closeMovies}
      title="Фильмы персоны"
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
        {selectedPerson?.movies.length ? (
          selectedPerson.movies.map((film, index) => (
            <Text key={index} size="lg" style={{ color: "#c0c0c4", marginBottom: "8px" }}>
              {film}
            </Text>
          ))
        ) : (
          <Text size="lg" style={{ color: "#c0c0c4" }}>
            Нет фильмов
          </Text>
        )}
      </div>
    </Modal>

      {/* Основная часть интерфейса */}
      <div className="mt-12">
        <div className="flex justify-center items-center">
          <div className="w-1/3">
            <Input
              radius={20}
              size="xl"
              placeholder="Поиск по ФИО"
              leftSection={<IconSearch size={30} />}
              onChange={(e) => handleInputChange("name", e.target.value)}
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
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex justify-center items-center mt-6 mb-10">
        <div className="grid grid-cols-3 gap-x-10 gap-y-6 text-2xl">
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Фильм"
            placeholder="Выберите фильм"
            data={movies}
            disabled={isLoading}
            onChange={(value) => handleInputChange("movie", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Роль"
            placeholder="Выберите роль"
            data={roles}
            disabled={isLoading}
            onChange={(value) => handleInputChange("role", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
          <Select
            size="lg"
            radius="md"
            label="Национальность"
            placeholder="Выберите национальность"
            data={nationalities}
            disabled={isLoading}
            onChange={(value) => handleInputChange("nationality", value || "")}
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
            }}
          />
        </div>
      </div>

      {/* Блок с данными */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-6">
            <p className="font-extralight flex justify-center items-center text-2xl text-amber-50">Загрузка</p>
            <Loader color="yellow" size="md" className="ml-2"/>
          </div>
        ) : currentPageData.length > 0 ? (
          currentPageData.map((item) => (
            <div key={item.id} className="ml-15 mr-15 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
              <div className="grid grid-cols-5 gap-x-4 text-2xl text-amber-50 h-18">
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">ФИО</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.name}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Национальность</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.nationality}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Роль</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.role}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Дата рождения</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{item.birthDate}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Список фильмов</p>
                  <div className="flex justify-center">
                    <div className="bg-zinc-900 rounded-2xl mt-3">
                      <Button
                        size="base"
                        variant="subtle"
                        color="white"
                        radius="xl"
                        onClick={() => {
                          setSelectedPerson(item);
                          openMovies();
                        }}
                      >
                        <IconMovie size={30} />
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
          color="dark.4"
          size="xl"
          styles={{ dots: { color: "#52525c" } }}
        />
      </div>
    </div>
  );
}