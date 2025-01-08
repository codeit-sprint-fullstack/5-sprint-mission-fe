const url = new URL("https://sprint-mission-api.vercel.app/products");
const headers = { "Content-Type": "application/json" };
let urlCheck = "";
const result = {
  name: "string",
  description: "string",
  price: 1,
  manufacturer: "string",
  tags: ["string"],
  images: ["string"],
};
const getProductList = async (page, pageSize, keyword) => {
  try {
    const response = await fetch(
      (urlCheck = `${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`),
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    console.log("getProductList Url : " + urlCheck);
    console.log("getProductList Data : " + JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("error : " + error);
  }
};
const getProduct = async (id) => {
  try {
    const response = await fetch((urlCheck = `${url}/${id}`), {
      method: "GET",
      headers,
    });
    const data = await response.json();
    console.log("getProduct Data : " + JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("error : " + error);
  }
};
const createProduct = async ({ name, description, price, tags, images }) => {
  try {
    const response = await fetch((urlCheck = url), {
      method: "POST",
      headers,
      data: {
        name,
        description,
        price,
        tags,
        images,
      },
    });
    const data = await response.json();
    console.log("createProduct Data : " + JSON.stringify(data));
    console.log("createProduct Data : " + data.name);
    return data;
  } catch (error) {
    console.log("error : " + error);
  }
};
const patchProduct = async (id, { name, description, price, tags, images }) => {
  try {
    const response = await fetch((urlCheck = `${url}${id}`), {
      method: "PATH",
      headers,
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });
    const data = await response.json();
    console.log("patchProduct Data : " + JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("error : " + error);
  }
};
const deleteProduct = async (id) => {
  try {
    const response = await fetch((urlCheck = `${url}${id}`), {
      method: "DELETE",
      headers,
    });
    const data = await response.json();
    console.log("GetInformation Data : " + JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("error : " + error);
  }
};

export const product = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
