import { list } from "postcss"
import { FC } from "react";

interface ImageListCompProps {
    imageList: string[];
}

export const ImageListComp:FC<ImageListCompProps> = ({imageList}) => {
    return <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {imageList.map((imageId) => (
            <div key={imageId} className="w-full md:w-1/3 lg:w-1/4 p-2 flex justify-center">
                <img className="rounded-lg shadow-lg object-cover w-full h-full max-w-xs"
                    // src={`https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`}
                    src={`http://62.146.182.67:1337/image?id=${imageId}`}
                    loading="lazy" // Enables lazy loading for images
                    alt="Generated thumbnail"
                />
            </div>
        ))}
    </div>
}