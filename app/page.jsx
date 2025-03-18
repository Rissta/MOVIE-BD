import {Button, Pagination, Select } from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="mt-20 text-3xl ml-40 mr-40  bg-zinc-800 rounded-2xl">
        <div className="flex justify-evenly items-center h-30 pb-10"> 
          <Select
            size="lg"
            radius="md"
            label="Название"
            placeholder="Выбрать название..."
            data={['React', 'Angular', 'Vue', 'Svelte']}
            defaultValue=""
            allowDeselect
            className="w-90 text-amber-50"

          />
          <Select
            size="lg"
            radius="md"
            label="Жанр"
            placeholder="Выбрать жанр..."
            data={['React', 'Angular', 'Vue', 'Svelte']}
            defaultValue=""
            allowDeselect
            className="w-90 text-amber-50"

          />
          <Select
            size="lg"
            radius="md"
            label="Год выхода"
            placeholder="Выбрать год..."
            data={['React', 'Angular', 'Vue', 'Svelte']}
            defaultValue=""
            allowDeselect
            className="w-90 text-amber-50"

          />
          <Select
            size="lg"
            radius="md"
            label="Option can be deselected"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            defaultValue=""
            allowDeselect
            className="w-90 text-amber-50"
          />
          <div className="bg-yellow-300 rounded-2xl mt-8 float-righ">
            <Button variant="subtle" color="dark.8" size="lg" leftSection={<IconSearch size={30}/>}>Поиск</Button>
          </div>
          </div>
        </div>
          <div className=" text-3xl ml-40 mr-40 mt-10 bg-zinc-800 rounded-2xl">
              <p className="text-amber-50 p-6 pl-20 border-b-3 border-zinc-800">Результат поиска</p>
          <div className="flex justify-evenly items-center h-20  border-b-3 border-zinc-800"> 
            <p className=" text-yellow-300  text-2xl">Название</p>
            <p className=" text-yellow-300 text-2xl">Жанр</p>
            <p className=" text-yellow-300  text-2xl">Год выхода</p>
            <p className=" text-yellow-300  text-2xl">Рейтинг</p>
            <p className=" text-yellow-300 text-2xl">Длительность</p>
          </div>
          <div className="flex justify-evenly items-center h-20  border-b-3 border-zinc-800">
            <p className="text-amber-50 text-2xl">DATA</p>
            <p className="text-amber-50 text-2xl">DATA</p>
            <p className="text-amber-50 text-2xl">DATA</p>
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
    </div>
  );
}
