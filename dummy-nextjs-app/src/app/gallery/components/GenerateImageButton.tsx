"use client"
import { FC } from "react"

interface GenerateImageButtonCompProps {
    fun: () => void
}

export const GenerateImageButtonComp:FC<GenerateImageButtonCompProps> = ({fun}) => {
    return <div className="flex flex-wrap justify-center items-center">
        <button onClick={() => fun()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate</button>
    </div>
}