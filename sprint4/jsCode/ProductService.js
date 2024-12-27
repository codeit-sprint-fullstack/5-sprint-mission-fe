import axios from "axios";

const API_BASE_URL = "https://sprint-mission-api.vercel.app/products";

export const getProductList = async (page, pageSize, keyword) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { page, pageSize, keyword }
        });
        return response.data;
    } catch(error) {
        console.error("Error fetching products:", error);
    }
};

