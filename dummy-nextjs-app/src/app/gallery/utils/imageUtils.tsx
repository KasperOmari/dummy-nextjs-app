import axios from "axios";

export const handleGenerate = async (inputText: string, setImageUrl: (url: string) => void, setLoading: (loading: boolean) => void) => {
    setLoading(true); // Show loading popup
    try {
        const response = await axios.post("https://cloud.activepieces.com/api/v1/webhooks/kRceRAJbzaUwmqQ1vLTDF/sync", inputText);
        setImageUrl(response.data["image"]);
    } catch (error) {
        console.error("Error generating image:", error);
    } finally {
        setLoading(false); // Hide loading popup
    }
};
