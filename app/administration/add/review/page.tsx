"use client";
import React, { useState, useEffect } from "react";
import { Input, Textarea, Select, Button, Loader } from "@mantine/core";
import { IconCheck, IconCircleX, IconPlus, IconSelect } from "@tabler/icons-react";

// Интерфейс для данных о рецензии
interface Review {
  reviewText: string;
  authorName: string;
  reviewDate: string;
  reviewRating: string;
  movieId: string;
}

export default function AddReview() {
  const [formData, setFormData] = useState<Review>({
    reviewText: "",
    authorName: "",
    reviewDate: "",
    reviewRating: "",
    movieId: "",
  });
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [movies, setMovies] = useState<{ value: string; label: string }[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки данных
  const [errors, setErrors] = useState<Record<string, string>>({}); // Ошибки валидации

  // Загрузка данных о фильмах
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/administration/add/review/select-data");
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.reviewText) newErrors.reviewText = "Текст рецензии обязателен.";
    if (!formData.authorName) newErrors.authorName = "Имя автора обязательно.";
    if (!formData.movieId) newErrors.movieId = "Фильм обязателен.";
    // Проверка даты награждения
    if (!formData.reviewDate) newErrors.reviewDate = "Дата рецензии обязательна.";
    if (
      formData.reviewDate &&
      !/^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/.test(formData.reviewDate)
    ) {
      newErrors.reviewDate = "Дата награждения должна быть в формате yyyy.mm.dd";
    }
    // Проверка рейтинга
    if (!formData.reviewRating) {
      newErrors.reviewRating = "Рейтинг обязательный.";
    }
    if (
      formData.reviewRating &&
      !/^\d$|^\d\.\d$/.test(formData.reviewRating)
    ) {
      newErrors.reviewRating =
        "Рейтинг должен быть либо целым числом, либо числом с одной цифрой в целой и дробной части.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsUploading(true);
    try {
      const response = await fetch("/api/administration/add/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Рецензия успешно создана!");
        setFormData({
          reviewText: "",
          authorName: "",
          reviewDate: "",
          reviewRating: "",
          movieId: "",
        });
        setSelectedMovie("");
        setErrors({});
      } else {
        alert("Ошибка при создании рецензии.");
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Произошла ошибка при отправке данных.");
    } finally {
      setIsUploading(false);
    }
  };

  // Обработка изменений в полях ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Обработка выбора фильма
  const handleMovieChange = (value: string | null) => {
    setSelectedMovie(value || "");
    setFormData((prev) => ({ ...prev, movieId: value || "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[75vw] mx-auto mt-10">
      {/* Блок с 3 полями в ряд */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-8">
        {/* Имя автора */}
        <Input.Wrapper label="Имя автора" className="text-amber-50" size="lg">
          <Input
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите имя автора"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.authorName ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.authorName && <p className="text-red-500 h-0">{errors.authorName}</p>}
        </Input.Wrapper>

        {/* Дата рецензии */}
        <Input.Wrapper label="Дата рецензии" className="text-amber-50" size="lg">
          <Input
            name="reviewDate"
            value={formData.reviewDate}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите дату (yyyy.mm.dd)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.reviewDate ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.reviewDate && <p className="text-red-500 h-0">{errors.reviewDate}</p>}
        </Input.Wrapper>

        {/* Рейтинг рецензии */}
        <Input.Wrapper label="Рейтинг" className="text-amber-50" size="lg">
          <Input
            name="reviewRating"
            value={formData.reviewRating}
            onChange={handleInputChange}
            size="lg"
            radius="md"
            placeholder="Введите значение рейтинга (8 или 9.2)"
            styles={{
              input: {
                backgroundColor: "#27272a",
                borderColor: errors.reviewRating ? "red" : "#27272a",
                color: "#fff",
              },
            }}
          />
          {errors.reviewRating && <p className="text-red-500 h-0">{errors.reviewRating}</p>}
        </Input.Wrapper>
      </div>

      {/* Текст рецензии */}
      <div className="mb-8">
        <Textarea
          name="reviewText"
          value={formData.reviewText}
          onChange={handleInputChange}
          className="w-full text-amber-50"
          size="lg"
          radius="md"
          label="Текст рецензии"
          placeholder="Введите текст рецензии"
          styles={{
            input: {
              backgroundColor: "#27272a",
              borderColor: errors.reviewText ? "red" : "#27272a",
              color: "#fff",
              height: "150px",
            },
          }}
        />
        {errors.reviewText && <p className="text-red-500 h-0">{errors.reviewText}</p>}
      </div>

      {/* Выбор фильма */}
      <div className="mb-8">
        <Select
          size="lg"
          radius="md"
          allowDeselect
          label="Фильм"
          className="text-amber-50 w-full"
          placeholder={isLoading ? "Загрузка..." : "Выберите фильм"}
          data={movies}
          value={selectedMovie}
          onChange={handleMovieChange}
          styles={{
            input: {
              backgroundColor: "#27272a",
              borderColor: errors.movieId ? "red" : "#27272a",
              color: "#71717b",
            },
            dropdown: {
              backgroundColor: "#27272a",
              border: "3px solid #171717",
              color: "#71717b",
            },
          }}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="flex justify-center mt-2 h-0">
            <Loader size="sm" color="yellow" />
          </div>
        )}
        {errors.movieId && <p className="text-red-500 h-0">{errors.movieId}</p>}
      </div>

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
                <Loader color="dark" size="md" className="ml-2" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}