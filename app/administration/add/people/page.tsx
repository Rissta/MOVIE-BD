"use client"; // Обязательно для использования React-хуков в Next.js 13+
import React, { useState, useEffect } from "react";
import { Input, MultiSelect, Button, Select } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";

// Интерфейс для данных о персоне
interface Person {
  name: string;
  nationality: string;
  role: string;
  birthDate: string;
  movieIds: string[];
}

export default function AddPeople() {
  const [formData, setFormData] = useState<Person>({
    name: "",
    nationality: "",
    role: "",
    birthDate: "",
    movieIds: [],
  });

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sweethcNationality, setSweethcNationality] = useState<boolean>(false);
  const [sweethcRole, setSweethcRole] = useState<boolean>(false);
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [movies, setMovies] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/administration/add/people/select-data");
      const data = await response.json();
      setNationalities(data.nationalities);
      setRoles(data.roles);
      setMovies(data.movies);
    };
    fetchData();
  }, []);

  const toggleNationalityField = () => {
    setSweethcNationality((prev) => !prev);
  };

  const toggleRoleField = () => {
    setSweethcRole((prev) => !prev);
  };

  const handleChange = (values: string[]) => {
    setSelectedValues(values);
    setFormData((prev) => ({ ...prev, movieIds: values }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/administration/add/people/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Персона успешно создана!");
      setFormData({
        name: "",
        nationality: "",
        role: "",
        birthDate: "",
        movieIds: [],
      });
      setSelectedValues([]);
      setSearchValue("");
    } else {
      alert("Ошибка при создании персоны.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[75vw] mx-auto mt-10">
      {/* Блок с полями ввода */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        {/* Поле ввода ФИО */}
        <Input.Wrapper label="ФИО" className="text-amber-50" size="lg">
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите ФИО"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Дата рождения" className="text-amber-50" size="lg">
          <Input
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите дату рождения"
            styles={{
              input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
            }}
          />
        </Input.Wrapper>

        {!sweethcNationality ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Национальность"
              className="text-amber-50"
              placeholder="Выберите национальность"
              data={nationalities}
              value={formData.nationality}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, nationality: value || "" }))
              }
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
              }}
            />
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button
                onClick={toggleNationalityField}
                variant="subtle"
                color="white"
                size="lg"
                leftSection={<IconPlus size={30} />}
              >
                Добавить национальность
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Input.Wrapper label="Национальность" className="text-amber-50" size="lg">
              <Input
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                size="lg"
                radius="md"
                placeholder="Введите национальность"
                styles={{
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button
                onClick={toggleNationalityField}
                variant="subtle"
                color="white"
                size="lg"
                leftSection={<IconSelect size={30} />}
              >
                Выбрать национальность
              </Button>
            </div>
          </div>
        )}

        {!sweethcRole ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Роль"
              className="text-amber-50"
              placeholder="Выберите роль"
              data={roles}
              value={formData.role}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value || "" }))
              }
              styles={{
                input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#71717b" },
                dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
              }}
            />
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button
                onClick={toggleRoleField}
                variant="subtle"
                color="white"
                size="lg"
                leftSection={<IconPlus size={30} />}
              >
                Добавить роль
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Input.Wrapper label="Роль" className="text-amber-50" size="lg">
              <Input
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                size="lg"
                radius="md"
                placeholder="Введите роль"
                styles={{
                  input: { backgroundColor: "#27272a", borderColor: "#27272a", color: "#fff" },
                }}
              />
            </Input.Wrapper>
            <div className="bg-zinc-800 rounded-2xl justify-self-end mt-6">
              <Button
                onClick={toggleRoleField}
                variant="subtle"
                color="white"
                size="lg"
                leftSection={<IconSelect size={30} />}
              >
                Выбрать роль
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Выбор фильмов */}
      <MultiSelect
        size="lg"
        radius="md"
        className="w-full text-amber-50"
        label="Фильм"
        placeholder={!selectedValues.length && !searchValue ? "Выбрать фильм" : ""}
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
          dropdown: { backgroundColor: "#27272a", border: "3px solid #171717", color: "#71717b" },
          pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
        }}
      />

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