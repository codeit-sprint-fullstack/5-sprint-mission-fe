// GET Product List
const getProductList = async (params) => {
  const res = await fetch(
    "https://sprint-mission-api.vercel.app/api/products",
    {
      method: "GET",
    }
  );
  url.searchParams.append("page", params.page);
  url.searchParams.append("pageSize", params.pageSize);
  url.searchParams.append("keyword", params.keyword);

  const data = await res.json();
  console.log(data);
};

// GET Product/:id
const getProduct = async (params) => {
  const url = new URL(
    `https://sprint-mission-api.vercel.app/api/products/${params.id}`
  );
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
};

// POST Product
const createProduct = async (params) => {
  const res = await fetch(
    "https://sprint-mission-api.vercel.app/api/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: params.name,
        description: params.description,
        price: params.price,
        tags: params.tags,
        images: params.images,
      }),
    }
  );
  const data = await res.json();
  return data;
};

// PATCH Product

const patchProduct = async (params) => {
  const url = new URL(
    `https://sprint-mission-api.vercel.app/api/products/${params.id}`
  );
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
      name: params.name,
      description: params.description,
      price: params.price,
      tags: params.tags,
      images: params.images,
    }),
  });
  const data = await res.json();
  return data;
};

// DELETE Product

const deleteProduct = async (params) => {
  const url = new URL(
    `https://sprint-mission-api.vercel.app/api/products/${params.id}`
  );
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
    }),
  });
  const data = await res.json();
  return data;
};

export default {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
}