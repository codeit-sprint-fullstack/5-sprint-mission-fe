import axios from "axios";

const API_BASE_URL = "https://sprint-mission-api.vercel.app/products";

export const getProductList = async (page, pageSize, keyword) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { page, pageSize, keyword }
        });
        return response.data;
    } catch(error) {
        console.error("Error", error);
    }
};


export const getProduct = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error", error);
    }
}


export const createProduct = async (name, description, price, tags, images) => {
    try {
        const response = await axios.post(API_BASE_URL, {
            name, description, price, tags, images
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
    }
};

export const patchProduct = async (id, updateData) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
    }
}


export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};