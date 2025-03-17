import { Button } from "@mantine/core";
import { IconDeviceTv, IconChartInfographic, IconSearch, IconEdit} from "@tabler/icons-react";

export default function Header(){
    return(
        <header className="text-4xl flex bg-zinc-800 h-22 text-amber-50 align-middle items-center place-content-between ">
            <div className="flex ms-40 ">
                <IconDeviceTv size={40}/>
                <h1>MoviesDB</h1>
            </div>
            <div className="flex m-20">
                <div>
                    <Button variant="subtle" color="white" size="xl" leftSection={<IconChartInfographic size={24}/>}>Статистика</Button>
                </div>
                <div>
                    <Button variant="subtle" color="white" size="xl" leftSection={<IconSearch size={24}/>}>Поиск</Button>
                </div>
                <div>
                    <Button variant="subtle" color="white" size="xl" leftSection={<IconEdit size={24}/>}>Редактирование</Button>
                </div>
            </div>
        </header>
    )
}