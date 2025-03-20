"use client"; // Обязательно для использования React-хуков в Next.js 13+
import { useState } from "react";
import { Button, Input, Modal, Pagination, Select, Text } from "@mantine/core";
import {
  IconFilter,
  IconFilterOff,
  IconLicense,
  IconMessage,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export default function Search() {
  const [openedDescription, { open: openDescription, close: closeDescription }] = useDisclosure(false); // Состояние для модального окна "Описание"
  const [openedPersons, { open: openPersons, close: closePersons }] = useDisclosure(false); // Состояние для модального окна "Персоны"
  const [openedGenres, { open: openGenres, close: closeGenres }] = useDisclosure(false); // Состояние для модального окна "Жанры"

  // Пример данных для фильмов
  const rawData = Array(30)
    .fill(0)
    .map((_, index) => ({
      id: index,
      title: `Фильм ${index + 1}`,
      rating: Math.floor(Math.random() * 5 + 5).toFixed(1),
      duration: `${Math.floor(Math.random() * 120 + 60)} минут`,
      country: ["Россия", "США", "Китай", "Индия"][Math.floor(Math.random() * 4)],
      studio: ["Disney", "Warner Bros", "Universal", "Sony"][Math.floor(Math.random() * 4)],
      description: `Описание фильма ${index + 1}. Это уникальное описание для каждого фильма.`,
      genres: ["Боевик", "Драма", "Комедия", "Триллер"][Math.floor(Math.random() * 4)],
      persons: [
        { name: "Джон Доу", role: "Режиссер" },
        { name: "Джейн Смит", role: "Актер" },
        { name: "Майк Браун", role: "Продюсер" },
        { name: "Эмили Уотсон", role: "Сценарист" },
      ],
    }));

  // Функция для разбиения массива на чанки
  function chunk(array, size) {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  // Разбиваем данные на страницы по 5 элементов на страницу
  const data = chunk(rawData, 5);

  // Состояние для отслеживания активной страницы
  const [activePage, setActivePage] = useState(1);

  // Получаем данные для текущей страницы
  const currentPageData = data[activePage - 1];

  // Состояние для отслеживания выбранного фильма
  const [selectedFilm, setSelectedFilm] = useState(null);

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
            {selectedFilm?.genres || "Нет жанров"}
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
            />
          </div>
          <div className="bg-yellow-300 rounded-2xl ml-6">
            <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconSearch size={30} />}>
              Поиск
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <div className="grid grid-cols-3 gap-x-10 gap-y-6 text-2xl">
          <Select
            size="lg"
            radius="md"
            allowDeselect
            label="Жанр"
            placeholder="Выберите жанр"
            data={["React", "Angular", "Vue", "Svelte"]}
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
            data={["React", "Angular", "Vue", "Svelte", "1", "12", "13", "14", "15", "16", "17", "18", "19"]}
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
            data={["Без сортировки", "Сначала новые", "Сначала старые", "От А до Я", "От Я до А"]}
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
            data={["React", "Angular", "Vue", "Svelte"]}
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
            data={["React", "Angular", "Vue", "Svelte"]}
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
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
              }}
            />
          </Input.Wrapper>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 mb-6">
        <div className="bg-zinc-800 rounded-2xl">
          <Button variant="subtle" color="white" size="lg" leftSection={<IconFilterOff size={30} />}>
            Сбросить фильтр
          </Button>
        </div>
        <div className="bg-yellow-300 rounded-2xl ml-8">
          <Button variant="subtle" color="dark.8" size="lg" leftSection={<IconFilter size={30} />}>
            Применить фильтр
          </Button>
        </div>
      </div>

      {/* Блок с данными */}
      <div>
        {currentPageData?.map((item) => (
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
      </div>

      {/* Пагинация */}
      <div className="flex justify-center items-center mt-6">
        <Pagination
          total={data.length} // Общее количество страниц
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