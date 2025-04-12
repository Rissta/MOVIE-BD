"use client";
import React, { useState, useEffect } from "react";
import { Input, MultiSelect, Button, Select, Loader } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";
import classesSelect from '/app/components/select.module.css';

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
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Новое состояние для загрузки данных
  const [errors, setErrors] = useState<Record<string, string>>({}); // Ошибки валидации

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/administration/add/people/select-data");
      const data = await response.json();
      setNationalities(data.nationalities);
      setRoles(data.roles);
      setMovies(data.movies);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = "ФИО обязательно.";
    } else {
        const parts = formData.name.split(';');
        if (parts.length < 2) {
            newErrors.name = "ФИО должно содержать минимум фамилию и имя, разделенные точкой с запятой (;).";
        } else {
            // Дополнительные проверки можно добавить здесь, если потребуется
            // Например, проверка на пустые значения или формат каждого элемента
        }
    }
    if (!formData.birthDate || !/^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/.test(formData.birthDate))
      newErrors.birthDate = "Дата рождения должна быть в формате yyyy.mm.dd";
    if (!formData.nationality) newErrors.nationality = "Национальность обязательна.";
    if (!formData.role) newErrors.role = "Роль обязательна.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUploading(true);
    try {
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
        setErrors({});
      } else {
        alert("Ошибка при создании персоны.");
      }
    } catch (error) {
      console.error("Error creating person:", error);
      alert("Произошла ошибка при отправке данных.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
            placeholder="Введите ФИО(Лаптев; Кирилл)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.name ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.name && <p className="text-red-500 h-0">{errors.name}</p>}
        </Input.Wrapper>

        {/* Дата рождения */}
        <Input.Wrapper label="Дата рождения" className="text-amber-50" size="lg">
          <Input
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите дату рождения (yyyy.mm.dd)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.birthDate ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.birthDate && <p className="text-red-500 h-0">{errors.birthDate}</p>}
        </Input.Wrapper>

        {/* Национальность */}
        {!sweethcNationality ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Национальность"
              className="text-amber-50"
              placeholder={isLoading ? "Загрузка..." : "Выберите национальность"}
              data={nationalities}
              value={formData.nationality}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, nationality: value || "" }))
              }
              styles={{
                input: {
                  borderColor: errors.nationality ? "red" : "#27272a",
                }
              }}
              classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
            {errors.nationality && (
              <p className="text-red-500 h-0">{errors.nationality}</p>
            )}
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
                  input: {
                    backgroundColor: "#27272a",
                    borderColor: errors.nationality ? "red" : "#27272a",
                    color: "#fff",
                  },
                }}
              />
            </Input.Wrapper>
            {errors.nationality && (
              <p className="text-red-500 h-0">{errors.nationality}</p>
            )}
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

        {/* Роль */}
        {!sweethcRole ? (
          <div>
            <Select
              size="lg"
              radius="md"
              allowDeselect
              label="Роль"
              className="text-amber-50"
              placeholder={isLoading ? "Загрузка..." : "Выберите роль"}
              data={roles}
              value={formData.role}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value || "" }))
              }
              styles={{
                input: {
                  borderColor: errors.role ? "red" : "#27272a",
                }
              }}
              classNames={{ input: classesSelect.selectInput, dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="flex justify-center mt-2 h-0">
                <Loader size="sm" color="yellow" />
              </div>
            )}
            {errors.role && <p className="text-red-500 h-0">{errors.role}</p>}
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
                  input: {
                    backgroundColor: "#27272a",
                    borderColor: errors.role ? "red" : "#27272a",
                    color: "#fff",
                  },
                }}
              />
            </Input.Wrapper>
            {errors.role && <p className="text-red-500 h-0">{errors.role}</p>}
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
        disabled={isLoading}
        size="lg"
        radius="md"
        className="w-full text-amber-50"
        label="Фильм (необязательно)"
        placeholder={ isLoading ? "Загрузка..." : (!selectedValues.length && !searchValue ? "Выбрать фильм" : "")}
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
          pill: { backgroundColor: "#ffdf20", color: "#171717", borderColor: "#ffdf20" },
        }}
        classNames={{ dropdown: classesSelect.selectDropdown, option: classesSelect.selectOption}}
      />
      {isLoading && (
        <div className="flex justify-center mt-2 h-0">
          <Loader size="sm" color="yellow" />
        </div>
      )}
      {/* Кнопки действий */}
      <div className="flex justify-center items-center space-x-10 mt-8">
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
                <Loader color="dark" size="md" className="ml-2 h-0" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}