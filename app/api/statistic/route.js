import { Group } from "@mantine/core"
import { assignRef } from "@mantine/hooks"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export const GET = async() => {
    const data = await Prisma.MovieScalarFieldEnum.Group({by:[title],_count:{_all:true}})
    //Prisma.movie.groupby({by:[title],_count:{_all:true}})
    return data
}