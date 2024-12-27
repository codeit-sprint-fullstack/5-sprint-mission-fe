import axios from 'axios';

const host = `https://sprint-mission-api.vercel.app`;

const getProductList = async ({ page = 1, pageSize = 100, keyword = '' }) => {
  const url = host + `/products`;
  return axios.get(url, {
    params: { page, pageSize, keyword }
  })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('Axios error:', error.message);
      }
      return [];
    });
}
// const productList = await getProductList({});
// console.log(productList);

const getProduct = async (id) => {
  const url = host + `/products/${id}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('Axios error:', error.message);
      }
      return null;
    });
}
// const product = await getProduct(225);
// console.log(`product :::: ` + `${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.manufacturer}`);


const createProduct = async ({ name, description, price, tags, images }) => {
  const url = host + `/products`;
  return axios.post(url, {
    name, description, price, tags, images
  })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('Axios error:', error.message);
      }
    });
}
// const newProduct = await createProduct({
//   name: "small memo",
//   description: "Easily take notes on any page you're visiting.",
//   price: 10,
//   tags: ["memo"],
//   images: ["url"]
// });
// console.log(newProduct);

const patchProduct = async (id, { name, description, price, tags, images }) => {
  const url = host + `/products/${id}`;
  return axios.patch(url, {
    name, description, price, tags, images
  })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('Axios error:', error.message);
      }
    });
}
// const updateProduct = await patchProduct(newProduct.id, {
//   name: "update small memo",
//   description: "update Easily take notes on any page you're visiting.",
//   price: 100,
//   tags: ["update", "memo"],
//   images: ["update", "url"]
// });
// console.log(updateProduct);

const deleteProduct = async (id) => {
  const url = host + `/products/${id}`;
  return axios.delete(url)
    .then(response => console.log("status: " + response.status + ", text: " + response.statusText))
    .catch(error => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('Axios error:', error.message);
      }
      return [];
    });
}
// deleteProduct(newProduct.id);

export const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
}