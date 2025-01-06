const getProductList = async (page, pageSize, keyword = "") => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching article list:", error.message);
  }
};

const resultList = await getProductList("1", "3");
console.log(resultList);

const getProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching article list:", error.message);
  }
};

const result = await getProduct(1);
console.log(result);

const createProduct = async (name, description, price, tags, images = "") => {
  try {
    const data = { name, description, price, tags, images };
    const res = await fetch(`https://sprint-mission-api.vercel.app/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataRE = await res.json();
    return dataRE;
  } catch (error) {
    console.error("Error fetching article list:", error.message);
  }
};

const resultCreat = await getProduct("test1", "um...", 1000, "문구");
console.log(resultCreat);

const patchProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Updated Name",
          description: "Updated Description.",
          price: "Updated Price.",
          tags: "Updated Tags.",
          images: "",
        }),
      }
    );

    const dataRE = await res.json();
    return dataRE;
  } catch (error) {
    console.error("Error fetching article list:", error.message);
  }
};

const resultPatch = await getProduct("test2", "미정", 1500, "문구용품");
console.log(resultPatch);

const deleteProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const dataRE = await res.json();
    return dataRE;
  } catch (error) {
    console.error("Error fetching article list:", error.message);
  }
};

const resultDelete = await getProduct(1);
console.log(resultDelete);

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
