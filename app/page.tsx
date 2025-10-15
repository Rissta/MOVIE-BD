"use client";
import React, { useState, useEffect } from "react";
import { IconAward, IconBuildings, IconDatabase, IconMovie, IconStar, IconUsersGroup } from "@tabler/icons-react";
import { Loader } from "@mantine/core";
import classes from '/app/components/paginationStat.module.css';

// Импорты для Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Определяем интерфейсы для данных
interface Studio {
  studioName: string;
  movieCount: number;
}

interface Person {
  personName: string;
  movieCount: number;
}

export default function Statistic() {
  // Состояния для хранения данных
  const [movieCount, setMovieCount] = useState<number>(0);
  const [genreCount, setGenreCount] = useState<number>(0);
  const [languageCount, setLanguageCount] = useState<number>(0);
  const [personCount, setPersonCount] = useState<number>(0);
  const [nationalityCount, setNationalityCount] = useState<number>(0);
  const [studioCount, setStudioCount] = useState<number>(0);
  const [countryCount, setCountryCount] = useState<number>(0);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Эффект для загрузки данных из API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/statistic");
        if (!response.ok) {
          throw new Error("Не удалось получить данные");
        }
        const data = await response.json();

        // Установка данных в состояние
        setMovieCount(data.movieCount);
        setGenreCount(data.genreCount);
        setLanguageCount(data.languageCount);
        setPersonCount(data.personCount);
        setNationalityCount(data.nationalityCount);
        setStudioCount(data.studioCount);
        setCountryCount(data.countryCount);
        setStudios(data.formattedStudios);
        setPersons(data.formattedPersons);
      } catch (error) {
        console.error("Ошибка при выборке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Настройки для столбчатой диаграммы
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fef3c7',
        }
      },
      title: {
        display: true,
        color: '#fef3c7',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fef3c7',
        },
        grid: {
          color: '#52525b',
        }
      },
      y: {
        ticks: {
          color: '#fef3c7',
        },
        grid: {
          color: '#52525b',
        }
      },
    },
  };

  // Данные для графика студий (топ-10)
  const studiosChartData = {
    labels: studios.slice(0, 10).map(studio => studio.studioName),
    datasets: [
      {
        label: 'Количество фильмов',
        data: studios.slice(0, 10).map(studio => studio.movieCount),
        backgroundColor: 'rgba(250, 204, 21, 0.7)',
        borderColor: 'rgba(250, 204, 21, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Данные для графика персон (топ-10)
  const personsChartData = {
    labels: persons.slice(0, 10).map(person => person.personName),
    datasets: [
      {
        label: 'Количество фильмов',
        data: persons.slice(0, 10).map(person => person.movieCount),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Данные для круговой диаграммы (топ-5 студий)
  const studiosDoughnutData = {
    labels: studios.slice(0, 5).map(studio => studio.studioName),
    datasets: [
      {
        label: 'Количество фильмов',
        data: studios.slice(0, 5).map(studio => studio.movieCount),
        backgroundColor: [
          'rgba(250, 204, 21, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(250, 204, 21, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-amber-50">
      <h1 className="ml-60 mt-6 text-2xl font-bold text-yellow-300">Общая статистика</h1>
      <div className="grid grid-cols-3 gap-8 ml-60 mt-6 mr-60">
        {/* Блок "Фильмы" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4 shadow-xl shadow-zinc-500/20">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Фильмы</p>
            <IconMovie className="text-yellow-300" size={40} />
          </div>
          {!isLoading ?
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">Количество фильмов</p>
              <p className="text-lg">{movieCount}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">Количество жанров</p>
              <p className="text-lg">{genreCount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Количество языков</p>
              <p className="text-lg">{languageCount}</p>
            </div>
          </div>
          : 
          <div className="flex justify-center items-center mt-6">
              <p className="font-extralight flex justify-center items-center text-xl text-amber-50">Загрузка</p>
              <Loader color="yellow" size="sm" className="ml-2"/>
          </div>
          }
        </div>

        {/* Блок "Люди" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4 shadow-xl shadow-zinc-500/20">
          <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-yellow-300 text-xl">Персоны</p>
              <IconUsersGroup className="text-yellow-300" size={40} />
          </div>
          {!isLoading ?
            <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg">Количество персон</p>
                  <p className="text-lg">{personCount}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg">Количество национальностей</p>
                  <p className="text-lg">{nationalityCount}</p>
                </div>
            </div>
            : 
            <div className="flex justify-center items-center mt-6">
              <p className="font-extralight flex justify-center items-center text-xl text-amber-50">Загрузка</p>
              <Loader color="yellow" size="sm" className="ml-2"/>
          </div>
            }
        </div>

        {/* Блок "Студии" */}
        <div className="h-auto w-full bg-zinc-800 rounded-4xl p-4 shadow-xl shadow-zinc-500/20">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-yellow-300 text-xl">Студии</p>
            <IconBuildings className="text-yellow-300" size={40} />
          </div>
          {!isLoading ?
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">Количество студий</p>
              <p className="text-lg">{studioCount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Количество стран</p>
              <p className="text-lg">{countryCount}</p>
            </div>
          </div>
          : 
          <div className="flex justify-center items-center mt-6">
              <p className="font-extralight flex justify-center items-center text-xl text-amber-50">Загрузка</p>
              <Loader color="yellow" size="sm" className="ml-2"/>
          </div>
          }
        </div>
      </div>

      {/* Блок с графиками */}
      <div className="grid grid-cols-2 gap-8 ml-60 mt-10 mr-60">
        
        {/* Левый блок с графиком студий */}
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4 shadow-xl shadow-zinc-500/20">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">
            Топ-10 студий по количеству фильмов
          </p>
          {!isLoading ? (
            <div className="h-80">
              <Bar options={barOptions} data={studiosChartData} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="font-extralight flex justify-center items-center text-xl text-amber-50">Загрузка</p>
              <Loader color="yellow" size="sm" className="ml-2"/>
            </div>
          )}
        </div>

        {/* Правый блок с графиком персон */}
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4 shadow-xl shadow-zinc-500/20">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">
            Топ-10 персон по количеству фильмов
          </p>
          {!isLoading ? (
            <div className="h-80 m-auto">
              <Bar options={barOptions} data={personsChartData} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="font-extralight flex justify-center items-center text-xl text-amber-50">Загрузка</p>
              <Loader color="yellow" size="sm" className="ml-2"/>
            </div>
          )}
        </div>

        {/* Дополнительный блок с круговой диаграммой */}
        <div className="h-auto w-full bg-zinc-800 rounded-2xl p-4 shadow-xl shadow-zinc-500/20 col-span-2 mb-10">
          <p className="text-center text-yellow-300 font-bold text-2xl mb-4">
            Распределение фильмов по топ-5 студиям
          </p>
          {!isLoading ? (
            <div className="h-80 flex justify-center">
              <div className="w-80">
                <Doughnut 
                  data={studiosDoughnutData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                        labels: {
                          color: '#fef3c7',
                        }
                      },
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="font-extralight flex justify-center items-center text-xl text-amber-50">Загрузка</p>
              <Loader color="yellow" size="sm" className="ml-2"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}