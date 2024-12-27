import axios from 'axios';

const host = `https://sprint-mission-api.vercel.app`;

const getProductList = async ({ page = 1, pageSize = 100, keyword = '' }) => {
  const url = host + `/products`;
  try {
    const response = await axios.get(url, {
      params: { page, pageSize, keyword }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error('Axios error:', error.message);
    }
    return [];
  }
};

const getProduct = async (id) => {
  const url = host + `/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error('Axios error:', error.message);
    }
    return null;
  }
};

const createProduct = async ({ name, description, price, tags, images }) => {
  const url = host + `/products`;
  try {
    const response = await axios.post(url, {
      name, description, price, tags, images
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error('Axios error:', error.message);
    }
  }
};

const patchProduct = async (id, { name, description, price, tags, images }) => {
  const url = host + `/products/${id}`;
  try {
    const response = await axios.patch(url, {
      name, description, price, tags, images
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error('Axios error:', error.message);
    }
  }
};

const deleteProduct = async (id) => {
  const url = host + `/products/${id}`;
  try {
    const response = await axios.delete(url);
    console.log("status: " + response.status + ", text: " + response.statusText);
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error('Axios error:', error.message);
    }
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
