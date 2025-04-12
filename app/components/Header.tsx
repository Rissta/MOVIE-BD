'use client';

import { Button, Menu } from "@mantine/core";
import { IconDeviceTv, IconChartInfographic, IconSearch, IconEdit, IconSquareRoundedPlus, IconXboxX } from "@tabler/icons-react";
import Link from "next/link";

// Определяем интерфейс для пунктов меню
interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode; // Иконка (опционально)
}

export default function Header() {
  // Данные для меню "Поиск"
  const searchMenuItems: MenuItem[] = [
    { label: "Фильмы", href: "/search/movie" },
    { label: "Персоны", href: "/search/people" },
    { label: "Студии", href: "/search/studio" },
  ];

  // Данные для меню "Администрирование"
  const adminMenuItems: MenuItem[] = [
    { label: "Добавить фильм", href: "/administration/add/movie", icon: <IconSquareRoundedPlus size={24} /> },
    { label: "Добавить персону", href: "/administration/add/people", icon: <IconSquareRoundedPlus size={24} /> },
    { label: "Добавить студию", href: "/administration/add/studio", icon: <IconSquareRoundedPlus size={24} /> },
    { label: "Добавить рецезнизию", href: "/administration/add/review", icon: <IconSquareRoundedPlus size={24} /> },
    { label: "Удалить фильм", href: "/administration/remove/movie", icon: <IconXboxX size={24} /> },
    { label: "Удалить персону", href: "/administration/remove/people", icon: <IconXboxX size={24} /> },
    { label: "Удалить студию", href: "/administration/remove/studio", icon: <IconXboxX size={24} /> },
    { label: "Удалить рецезнизию", href: "/administration/add/review", icon: <IconXboxX size={24} /> },
  ];
  return (
    <header className="text-4xl flex bg-zinc-800 h-22 text-amber-50 align-middle items-center place-content-between">
      {/* Левая часть заголовка */}
      <div className="flex ms-40">
        <IconDeviceTv size={40} />
        <h1>MoviesDB</h1>
      </div>

      {/* Правая часть заголовка */}
      <div className="flex m-20">
        {/* Кнопка "Статистика" */}
        <div>
          <Button
            component={Link}
            href="/"
            variant="subtle"
            color="white"
            size="xl"
            leftSection={<IconChartInfographic size={24} />}
          >
            Статистика
          </Button>
        </div>

        {/* Меню "Поиск" */}
        <Menu
          trigger="click"
          styles={{ dropdown: { backgroundColor: '#27272a', borderColor: '#09090b', width: '200px' } }}
        >
          <Menu.Target>
            <Button variant="subtle" color="white" size="xl" leftSection={<IconSearch size={24} />}>
              Поиск
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {searchMenuItems.map((item, index) => (
              <Menu.Item key={index} color="dark.5" component={Link} href={item.href}>
                <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">
                  {item.label}
                </p>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        {/* Меню "Администрирование" */}
        <Menu
          trigger="click"
          styles={{ dropdown: { backgroundColor: '#27272a', borderColor: '#09090b', width: '350px' } }}
        >
          <Menu.Target>
            <Button variant="subtle" color="white" size="xl" leftSection={<IconEdit size={24} />}>
              Администрирование
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {adminMenuItems.map((item, index) => (
              <Menu.Item key={index} color="dark.5" component={Link} href={item.href}>
                <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">
                  {item.label}
                  {item.icon}
                </p>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
}