"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Loader, Modal, Pagination, Select, Text } from "@mantine/core";
import {
  IconFilter,
  IconFilterOff,
  IconMovie,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import classes from '/app/components/pagination.module.css';
import classesSelect from '/app/components/select.module.css';

interface Studio {
  id: number;
  studioName: string;
  country: string;
  foundationYear: string;
  movies: string[];
}

export default function StudioDirectory() {
  const [openedMovies, { open: openMovies, close: closeMovies }] = useDisclosure(false);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [movies, setMovies] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки

  const [filters, setFilters] = useState<{
    studioName: string | null;
    country: string | null;
    movie: string | null;
  }>({
    studioName: null,
    country: "",
    movie: "",
  });

  const clearFilters = () => {
    setFilters({
      studioName: null,
      country: null,
      movie: null,
    });
  };
  
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

      const response = await fetch(`/api/search/studio?${queryParams}`);
      if (!response.ok) throw new Error("Ошибка при загрузке данных");
      const data = await response.json();
      setStudios(data.studios || []);
      setCountries(data.filters.countries || []);
      setMovies(data.filters.movies || []);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  // Обработчик изменений в полях ввода
  const handleInputChange = (field: string, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value === "" ? null : value, // Преобразуем пустую строку в null
    }));
  };
  
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const paginatedData = chunk(studios, 6);
  const currentPageData = paginatedData[activePage - 1] || [];

  return (
    <div className="w-full max-w-[120vw] mx-auto">
      {/* Модальное окно */}
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
        {selectedStudio?.movies.length ? (
          selectedStudio.movies.map((film, index) => (
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
              placeholder="Поиск по названию студии"
              leftSection={<IconSearch size={30} />}
              onChange={(e) => handleInputChange("studioName", e.target.value)}
            />
          </div>
          <div className="bg-yellow-300 rounded-2xl ml-6">
            <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconSearch size={30} />} onClick={fetchData}>
              Поиск
            </Button>
          </div>
          <div className="bg-zinc-800 rounded-2xl ml-6">
            <Button
              variant="subtle"
              color="white"
              size="xl"
              leftSection={<IconFilterOff size={30} />}
              onClick={clearFilters} // Добавляем обработчик для очистки фильтров
            >
              Очистить фильтр
            </Button>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex justify-center items-center mt-6 mb-10">
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-2xl">
          <Select
            className="text-amber-50"
            size="lg"
            radius="md"
            allowDeselect
            label="Фильм"
            placeholder="Выберите фильм"
            data={movies}
            value={filters.movie}
            disabled={isLoading}
            onChange={(value) => handleInputChange("movie", value || "")}
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
          currentPageData.map((studio) => (
            <div key={studio.id} className="ml-15 mr-15 mt-2 bg-zinc-800 pt-4 pb-4 mb-3 rounded-2xl pr-10 pl-10">
              <div className="grid grid-cols-4 gap-x-4 text-2xl text-amber-50 h-18">
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Название студии</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{studio.studioName}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Страна</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{studio.country}</p>
                </div>
                <div className="items-center">
                  <p className="font-extralight flex justify-center items-center text-base">Год создания</p>
                  <p className="h-10 flex justify-center items-center rounded-2xl text-xl mt-3 text-balance">{studio.foundationYear}</p>
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
                          setSelectedStudio(studio);
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
          classNames={{control: classes.paginationControls}}
          size="xl"
          styles={{ dots: { color: "#52525c" } }}
        />
      </div>
    </div>
    
  );
}