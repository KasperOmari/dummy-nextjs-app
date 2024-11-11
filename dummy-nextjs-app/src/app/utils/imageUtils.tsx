import axios from "axios";
import { config } from "../config/config";

export const handleGenerate = async (inputText: string, setImageUrl: (url: string) => void, setLoading: (loading: boolean) => void) => {
    setLoading(true); // Show loading popup
    try {
        const response = await axios.post(config.generateImageUrl, inputText);
        setImageUrl(response.data["image"]);
    } catch (error) {
        console.error("Error generating image:", error);
    } finally {
        setLoading(false); // Hide loading popup
    }
};
