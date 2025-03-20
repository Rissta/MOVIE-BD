'use client';

import { Button, Menu } from "@mantine/core";
import { IconDeviceTv, IconChartInfographic, IconSearch, IconEdit, IconSquareRoundedPlus, IconXboxX} from "@tabler/icons-react";
import Link from "next/link";

export default function Header(){
    return(
        <header className="text-4xl flex bg-zinc-800 h-22 text-amber-50 align-middle items-center place-content-between">
            <div className="flex ms-40 ">
                <IconDeviceTv size={40}/>
                <h1>MoviesDB</h1>
            </div>
            <div className="flex m-20">
                <div>
                    <Button component={Link} href="/" variant="subtle" color="white" size="xl" leftSection={<IconChartInfographic size={24}/>}>Статистика</Button>
                </div>
                <Menu trigger="click" styles={{dropdown: { backgroundColor: '#27272a', borderColor: '#09090b', width: '150px'}}}>
                    <Menu.Target>
                        <Button variant="subtle" color="white" size="xl" leftSection={<IconSearch size={24}/>}>Поиск</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color="dark.5" component={Link} href="/search/movie">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Фильмы</p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/search/people">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Персоны</p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/search/studio">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Студии</p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/search/award">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Награды</p>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <Menu trigger="click" styles={{dropdown: { backgroundColor: '#27272a', borderColor: '#09090b', width: '290px'}}}>
                    <Menu.Target>
                        <Button variant="subtle" color="white" size="xl" leftSection={<IconEdit size={24}/>}>Администрирование</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color="dark.5" component={Link} href="/administration/add/movie">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить фильм<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/add/people">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить персону<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/add/studio">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить студию<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/add/award">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить награду<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/remove/movie">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Удалить фильм<IconXboxX size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/remove/people">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Удалить персону<IconXboxX size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/remove/studio">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Удалить студию<IconXboxX size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/remove/award">
                            <p className="flex justify-between items-center bg-zinc-800 text-amber-50 text-xl h-10">Удалить награду<IconXboxX size={24}/></p>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </header>
    )
}