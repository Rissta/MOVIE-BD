import { Button, Pagination, Text } from "@mantine/core";
import { IconAward, IconBuildings, IconDatabase, IconMovie, IconStar, IconUsersGroup} from "@tabler/icons-react";
import Image from "next/image";

export default function Page1(){
    return (
        <div>
              <div className="grid grid-cols-2 grid-rows-1 gap-8 ml-60 mt-10 text-2xl mr-60">
        <div className="h-100 w-230  bg-zinc-800 rounded-2xl text-3xl">
            <p className="p-3 pl-20 border-b-3 border-zinc-700 font-bold text-yellow-300">Фильмы по студиям</p>
            <div className="flex place-content-between items-center h-13  border-b-3 border-zinc-700 pl-20 pr-20"> 
                <p className=" text-amber-50 text-3xl">Студия</p>
                <p className=" text-amber-50 text-3xl">Количество фильмов</p>
            </div>
            <div className="flex place-content-between items-center h-13  border-b-3 border-zinc-700 pl-20 pr-20">
                <p className="text-amber-50 text-2xl">DATA</p>
                <p className="text-amber-50 text-2xl">DATA</p>
            </div>
            <div className="flex justify-evenly items-center h-20">
                <Pagination total={10} 
                style={{
                  "--pagination-active-bg": "#ffdf20", // Цвет фона активного элемента
                  "--pagination-active-color": "#171717", // Цвет текста активного элемента
                }}
                size="xl"
                />
            </div>
        </div>
        <div className="h-100 w-230  bg-zinc-800 rounded-2xl text-3xl">
            <p className=" p-3 pl-20 border-b-3 border-zinc-700 font-bold text-yellow-300">Фильмы у персон</p>
            <div className="flex place-content-between items-center h-13  border-b-3 border-zinc-700 pl-20 pr-20"> 
                <p className=" text-amber-50 text-3xl">Персона</p>
                <p className=" text-amber-50 text-3xl">Количество фильмов</p>
            </div>
            <div className="flex place-content-between items-center h-13  border-b-3 border-zinc-700 pl-20 pr-20">
                <p className="text-amber-50 text-2xl">DATA</p>
                <p className="text-amber-50 text-2xl">DATA</p>
            </div>
            <div className="flex justify-evenly items-center h-20">
                <Pagination 
                total={10}
                size="xl"
                style={{
                  "--pagination-active-bg": "#ffdf20", // Цвет фона активного элемента
                  "--pagination-active-color": "#171717", // Цвет текста активного элемента
                }}
                />
            </div>
        </div>
      </div>
        <h1 className="ml-60 mt-10 text-4xl font-bold text-yellow-300"  >Общая статистика</h1>
        <div className="grid grid-flow-col grid-rows-2 gap-8 ml-60 mt-10 text-2xl mr-60">
  
          <div className="h-55 w-150  bg-zinc-800  text-amber-50 rounded-4xl ">
            <div className="flex place-content-between m-4">
              <p className="font-bold  text-yellow-300">Фильмы</p>
              <IconMovie className="float-end text-yellow-300 rounded-4xl" size={40}/>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество фильмов</p>
              <p >123</p>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество жанров</p>
              <p >123</p>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество языков</p>
              <p >123</p>
            </div>
          </div>
  
          <div className="h-55 w-150  bg-zinc-800  text-amber-50 rounded-4xl ">
            <div className="flex place-content-between m-4">
              <p className="font-bold text-yellow-300">Люди</p>
              <IconUsersGroup className="float-end text-yellow-300 rounded-4xl" size={40}/>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество Людей</p>
              <p >123</p>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество национальностей</p>
              <p >123</p>
            </div>
          </div>
  
          <div className="h-55 w-150  bg-zinc-800  text-amber-50 rounded-4xl ">
            <div className="flex place-content-between m-4">
              <p className="font-bold text-yellow-300">Студии</p>
              <IconBuildings className="float-end text-yellow-300 rounded-4xl" size={40}/>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество студий</p>
              <p >123</p>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество стран</p>
              <p >123</p>
            </div>
          </div>
  
          <div className="h-55 w-150  bg-zinc-800  text-amber-50 rounded-4xl ">
            <div className="flex place-content-between m-4">
              <p className="font-bold text-yellow-300">Рейтинг</p>
              <IconStar className="float-end text-yellow-300 rounded-4xl" size={40}/>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество отзывов</p>
              <p >123</p>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Средний рейтинг</p>
              <p >123</p>
            </div>
          </div>
  
          <div className="h-55 w-150  bg-zinc-800  text-amber-50 rounded-4xl ">
            <div className="flex place-content-between m-4">
              <p className="font-bold text-yellow-300">Награды</p>
              <IconAward className="float-end text-yellow-300 rounded-4xl" size={40}/>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество наград</p>
              <p >123</p>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество категорий</p>
              <p >123</p>
            </div>
          </div>
  
          <div className="h-55 w-150  bg-zinc-800  text-amber-50 rounded-4xl ">
            <div className="flex place-content-between m-4">
              <p className="font-bold text-yellow-300">База данных</p>
              <IconDatabase className="float-end text-yellow-300 rounded-4xl" size={40}/>
            </div>
            <div className="flex place-content-between m-4">
              <p className="">Количество записей</p>
              <p >123</p>
            </div>
          </div>
      </div>
      </div>
    );
}