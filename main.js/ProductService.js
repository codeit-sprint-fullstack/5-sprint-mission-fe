import axios from 'axios';

const baseUrl = 'https://sprint-mission-api.vercel.app/products' ;

export const getProductList = async (page = 1, pageSize = 100, keyword = '') => {
  try {
    const res = await axios.get(`${baseUrl}`, {
    params : {page, pageSize, keyword},
  });
  return res.data;
} catch (error) {
  console.log('Failed to fetch product list:', error);
}
}

export const getProduct = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}${id}`);
    return res.data;
} catch(error) {
    console.log('상품을 찾을 수 없음', error);
  };
}

export const createProduct = async (user) => {
  try{
    const res = await axios.post(`${baseUrl}`, {
      name : user.name.value,
      description : user.description.value,
      price : '0',
      tags : [user.tags.value],
      images : [user.images.value],
    });
  return res.data;
} catch(error) {
    console.log('유효성 검사 오류', error);
  };
}

export const patchProduct = async (id, user) => {
  try{
  const res = await axios.patch(`${baseUrl}/${id}`, user);
  return await res.axiosdata;
  }catch (error) {
    console.log('상품을 찾을 수 없음', error);
  };
}

export const deleteProduct = async (id) => {
  
  try {
  await axios.delete(`${baseUrl}/${id}`);
  console.log(`Product with ID ${id} deleted successfully.`);
  } catch (error) {
    console.log('상품을 찾을 수 없음', error);
  };
}
