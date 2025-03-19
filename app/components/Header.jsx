'use client';

import { Button, Menu } from "@mantine/core";
import { IconDeviceTv, IconChartInfographic, IconSearch, IconEdit, IconSquareRoundedPlus} from "@tabler/icons-react";
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
                <div>
                    <Button component={Link} href="/search" variant="subtle" color="white" size="xl" leftSection={<IconSearch size={24}/>}>Поиск</Button>
                </div>
                <Menu trigger="click" styles={{dropdown: { backgroundColor: '#27272a', borderColor: '#27272a'}}}>
                    <Menu.Target>
                        <Button variant="subtle" color="white" size="xl" leftSection={<IconEdit size={24}/>}>Администрирование</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addmovie">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить фильм<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addpeople">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить персону<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addstudio">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить студию<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addaward">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить награду<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addaward">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить награду<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addaward">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить награду<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                        <Menu.Item color="dark.5" component={Link} href="/administration/addaward">
                            <p className="flex justify-center items-center bg-zinc-800 text-amber-50 text-xl h-10">Добавить награду<IconSquareRoundedPlus size={24}/></p>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </header>
    )
}