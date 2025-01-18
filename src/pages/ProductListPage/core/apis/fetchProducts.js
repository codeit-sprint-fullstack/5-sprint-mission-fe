import axios from 'axios';
import config from '../../../../config.js';

export const fetchProducts = async ({ value = "" }) => {
  try {
    const res = await axios.get(`${config.API_URL}/?name=${value}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};