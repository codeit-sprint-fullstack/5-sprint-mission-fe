import axios from 'axios';

const host = `https://sprint-mission-api.vercel.app`;

//[1]
//getProductList() : GET 메서드를 사용해 주세요.
//  page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
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
const productList = await getProductList({});
console.log(productList);

//[2]
//getProduct() : GET 메서드를 사용해 주세요.
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
const product = await getProduct(225);
console.log(`product :::: ` + `${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.manufacturer}`);


//[3]
//createProduct() : POST 메서드를 사용해 주세요.
//  request body에 name, description, price, tags, images 를 포함해 주세요.
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
const newProduct = await createProduct({
  name: "small memo",
  description: "Easily take notes on any page you're visiting.",
  price: 10,
  tags: ["memo"],
  images: ["url"]
});
console.log(newProduct);


//[4]
//patchProduct() : PATCH 메서드를 사용해 주세요.
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
const updateProduct = await patchProduct(newProduct.id, {
  name: "update small memo",
  description: "update Easily take notes on any page you're visiting.",
  price: 100,
  tags: ["update", "memo"],
  images: ["update", "url"]
});
console.log(updateProduct);

//[5]
//deleteProduct() : DELETE 메서드를 사용해 주세요.
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
deleteProduct(newProduct.id);