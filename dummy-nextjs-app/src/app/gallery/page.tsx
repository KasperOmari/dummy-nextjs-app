"use client"
import axios from "axios";
import { GenerateImageButtonComp } from "./components/GenerateImageButton";
import { useEffect, useState } from "react";
import { ImageListComp } from "./components/ImageList";
import { LoadingPopup } from "./components/LoadingPopup";
import { handleGenerate } from "../utils/imageUtils";
import { handleNextPage, handlePreviousPage } from "../utils/paginationUtils";
import { config } from "../config/config";

export default function Home() {
    const [imageUrl, setImageUrl] = useState("")
    const [imageList, setImageList] = useState([])
    const [inputText, setInputText] = useState("")
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const imagesPerPage = 5;

    const getImages = async () => {
        const response = await axios.get(config.listImagesUrl)
        const fileIds = response.data["files"].map((file:any) => file["id"])
        setImageList(fileIds)
    }

    useEffect(() => {
        getImages()
    }, [imageUrl])

    // Calculate the images for the current page
    const startIndex = (page - 1) * imagesPerPage;
    const currentImages = imageList.slice(startIndex, startIndex + imagesPerPage);

    return <div>
        <div className="flex items-center justify-center">
            <input type="text" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 text-center placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter your prompt here"
            ></input>
        </div>
        <div>
            <LoadingPopup isVisible={loading} close={() => setLoading(false)} />
            <GenerateImageButtonComp fun={() => handleGenerate(inputText, setImageUrl, setLoading)}/>
        </div>
        <ImageListComp imageList={currentImages}/>
        {/* Pagination Buttons */}
        <div className="fixed bottom-4 inset-x-0 flex justify-center space-x-4">
            <button
                onClick={() => handlePreviousPage(page, setPage)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-200 flex items-center justify-center"
                aria-label="Previous">
                {/* Left Arrow Unicode Character */}
                <span className="text-lg">&larr;</span>
            </button>
            <button
                onClick={() => handleNextPage(page, imageList.length, imagesPerPage, setPage)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-200 flex items-center justify-center"
                aria-label="Next">
                {/* Right Arrow Unicode Character */}
                <span className="text-lg">&rarr;</span>
            </button>
        </div>
    </div>
}