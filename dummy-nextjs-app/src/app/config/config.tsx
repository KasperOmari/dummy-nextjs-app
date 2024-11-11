import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_GENERATE_IMAGE_WEBHOOK_URL } from "../globalConstants";

export const config = {
    listImagesUrl: NEXT_PUBLIC_BACKEND_URL + "/list_images",
    getImageUrl: NEXT_PUBLIC_BACKEND_URL + "/image?id=",
    generateImageUrl: NEXT_PUBLIC_GENERATE_IMAGE_WEBHOOK_URL
};