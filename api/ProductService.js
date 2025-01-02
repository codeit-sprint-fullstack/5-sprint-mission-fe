import { getAxiosInstance } from './axiosInstance.js';

const productClient = getAxiosInstance(`https://sprint-mission-api.vercel.app/products`);

const getProductList = async ({ page = 1, pageSize = 100, keyword = '' }) => {
  try {
    const response = await productClient.get(`/`, {
      params: { page, pageSize, keyword }
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getProduct = async (id) => {
  try {
    const response = await productClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const createProduct = async ({ name, description, price, tags, images }) => {
  try {
    const response = await productClient.post(`/`, {
      name, description, price, tags, images
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const patchProduct = async (id, { name, description, price, tags, images }) => {
  try {
    const response = await productClient.patch(`/${id}`, {
      name, description, price, tags, images
    });
    return response.data;
  } catch (error) {
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await productClient.delete(`/${id}`);
    console.log("status: " + response.status + ", text: " + response.statusText);
  } catch (error) {
    return [];
  }
};

export const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};
