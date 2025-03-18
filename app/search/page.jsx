'use client'
import { Button, Input, Modal, Pagination, Select, Text } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconBuildings, IconFilter, IconFilterOff, IconMessage, IconSearch, IconUsersGroup } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export default function Search() {
    const [openedDescription, { open: openDescription, close: closeDescription }] = useDisclosure(false); // Состояние для модального окна "Описание"
    const [openedPersons, { open: openPersons, close: closePersons }] = useDisclosure(false); // Состояние для модального окна "Персоны"
    // Пример данных для персон
    const persons = [
        { name: "Джон Доу", role: "Режиссер" },
        { name: "Джейн Смит", role: "Актер" },
        { name: "Майк Браун", role: "Продюсер" },
        { name: "Эмили Уотсон", role: "Сценарист" },
    ];
    return (
        <div>
           {/* Модальное окно "Описание" */}
           <Modal
                opened={openedDescription}
                onClose={closeDescription}
                title="Описание"
                centered
                size="xl"
                radius={"lg"}
                styles={{
                    header: { backgroundColor: '#27272a' },
                    title: { color: '#c0c0c4', backgroundColor: '#27272a', fontSize: "25px" },
                    body: { backgroundColor: '#27272a', color: '#c0c0c4', fontSize: "20px" },
                }}
            >
                <Text size="lg" style={{ color: '#c0c0c4' }}>
                    Это описание фильма или другого элемента. Здесь можно разместить подробную информацию о выбранном объекте.
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
                    header: { backgroundColor: '#27272a' },
                    title: { color: '#c0c0c4', backgroundColor: '#27272a', fontSize: "25px" },
                    body: { backgroundColor: '#27272a', color: '#c0c0c4', fontSize: "20px" },
                }}
            >
                <div>
                    {persons.map((person, index) => (
                        <div key={index} className="flex justify-between items-center mb-4">
                            <Text size="lg" style={{ color: '#c0c0c4' }}>
                                {person.name}
                            </Text>
                            <Text size="md" style={{ color: '#888888' }}>
                                {person.role}
                            </Text>
                        </div>
                    ))}
                </div>
            </Modal>
            <div className="mt-12 ml-180 mr-180">
                <div className="flex">
                    <div className="w-220">
                        <Input radius={20} size="xl" placeholder="Поиск по фильмам, актерам" leftSection={<IconSearch size={30} />}/>
                    </div>
                    <div className="bg-yellow-300 rounded-2xl float-end ml-6">
                        <Button variant="subtle" color="dark.8" size="xl" leftSection={<IconSearch size={30} />}> Поиск </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 gap-[1px] gap-y-6 text-2xl ml-50 mr-50 mt-6">
                    <Select size="lg" radius="md" className="w-150 text-amber-50"
                    label="Сортировать" placeholder="Выбрите жанр"
                    defaultValue="Без сортировки" allowDeselect={false}
                    data={['Без сортировки', 'Сначала новые', 'Сначало старые', 'От А до Я', 'От Я до А']}
                    styles={{
                        input: { backgroundColor: '#27272a',  borderColor: '#27272a', color: '#71717b'},
                        dropdown: { backgroundColor: '#27272a', border: '3px solid #171717', color: '#71717b'},	
                    }}
                    />
                    <Select size="lg" radius="md" allowDeselect className="w-150 text-amber-50"
                    label="Жанр" placeholder="Выбрите жанр"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    styles={{
                        input: { backgroundColor: '#27272a',  borderColor: '#27272a', color: '#71717b'},
                        dropdown: { backgroundColor: '#27272a', border: '3px solid #171717', color: '#71717b'},	
                    }}
                    />
                    <Select size="lg" radius="md" allowDeselect className="w-150 text-amber-50"
                    label="Персона" placeholder="Выбрите персону"
                    data={['React', 'Angular', 'Vue', 'Svelte','1','12','13','14','15','16','17','18','19']}
                    styles={{
                        input: { backgroundColor: '#27272a',  borderColor: '#27272a', color: '#71717b'},
                        dropdown: { backgroundColor: '#27272a', border: '3px solid #171717', color: '#71717b'},	
                    }}
                    />
                    <Select size="lg" radius="md" allowDeselect className="w-150 text-amber-50"
                    label="Страна" placeholder="Выбрите выберете страну"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    styles={{
                        input: { backgroundColor: '#27272a',  borderColor: '#27272a', color: '#71717b'},
                        dropdown: { backgroundColor: '#27272a',  border: '3px solid #171717', color: '#71717b'},	
                    }}
                    />
                    <Select size="lg" radius="md" allowDeselect className="w-150 text-amber-50"
                    label="Год" placeholder="Выбрите год"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    styles={{
                        input: { backgroundColor: '#27272a',  borderColor: '#27272a', color: '#71717b'},
                        dropdown: { backgroundColor: '#27272a', border: '3px solid #171717', color: '#71717b'},	
                    }}
                    />
                    <Input.Wrapper label="Рейтинг" className="text-amber-50" size="md">
                        <Input size="lg" radius="md" className="w-150 text-amber-50"
                        placeholder="От"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        styles={{
                            input: { backgroundColor: '#27272a',  borderColor: '#27272a', color: '#71717b'},
                        }}
                        />
                    </Input.Wrapper>
                </div>
                <div className=" flex justify-self-center items-center mt-8 mr-16 mb-15">
                    <div className="bg-zinc-800 rounded-2xl">
                            <Button variant="subtle" color="white" size="lg" leftSection={<IconFilterOff size={30} />}> Сбросить фильтр </Button>
                    </div>
                    <div className="bg-yellow-300 rounded-2xl ml-8">
                            <Button variant="subtle" color="dark.8" size="lg" leftSection={<IconFilter size={30} />}> Пременить фильтр </Button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-x-20 text-2xl ml-50 mr-50 mt-2 text-amber-50 bg-zinc-800 pt-4 pb-4 rounded-2xl">
                    <div className="items-center">
                        <p className="font-extralight flex justify-center items-center text-base">Название</p>
                        <p className=" h-10 flex justify-center items-center rounded-2xl">Название</p>
                    </div>
                    <div className="items-center">
                        <p className="font-extralight flex justify-center items-center text-base">Рейтинг</p>
                        <p className=" h-10 flex justify-center items-center rounded-2xl">8.6</p>
                    </div>
                    <div className="items-center">
                        <p className="font-extralight flex justify-center items-center text-base">Длительность</p>
                        <p className=" h-10 flex justify-center items-center rounded-2xl">216 минут</p>
                    </div>
                    <div className="items-center">
                        <p className="font-extralight flex justify-center items-center text-base">Страна</p>
                        <p className=" h-10 flex justify-center items-center rounded-2xl">Россия</p>
                    </div>
                    <div className="items-center">
                        <p className="font-extralight flex justify-center items-center text-base">Студия</p>
                        <p className=" h-10 flex justify-center items-center rounded-2xl">Would Disney</p>
                    </div>
                    <div className="tems-center">
                        <p className="font-extralight flex justify-center items-center text-base">Персоны</p>
                        <div className="flex justify-center">
                            <div className="bg-zinc-900 rounded-2xl">
                                <Button size="base" variant="subtle" color="white" radius="lg" onClick={openPersons}><IconUsersGroup size={30}/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="tems-center">
                        <p className="font-extralight flex justify-center items-center text-base">Описание</p>
                        <div className="flex justify-center">
                            <div className="bg-zinc-900 rounded-2xl">
                                <Button size="base" variant="subtle" color="white" onClick={openDescription} radius="lg"><IconMessage size={30}/></Button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-evenly items-center h-20">
                    <Pagination total={10} 
                    style={{
                    "--pagination-active-bg": "#ffdf20",
                    "--pagination-active-color": "#171717",
                    }}
                    size="xl"
                    />
                </div>
        </div>
    );
}