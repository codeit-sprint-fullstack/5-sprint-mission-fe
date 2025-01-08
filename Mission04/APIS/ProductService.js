export const baseURL = "https://sprint-mission-api.vercel.app";

//상품리스트 조회
const getProductList = async ({ params }) => {
  try {
    const endPoint = new URL("/products", baseURL);
    Object.keys(params).forEach((key) =>
      endPoint.searchParams.append(key, params[key])
    );
    const response = await fetch(endPoint.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("fetch 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetching product list 실패:", error.message);
  }
};

//상품 상세 조회
const getProduct = async ({ id }) => {
  try {
    const endPoint = new URL(`/products/${id}`, baseURL);
    const res = await fetch(endPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 404) {
      return { message: "페이지 찾을 수 없음" };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("fetching product by id 오류:", error.message);
    throw new Error("get product by id 실패");
  }
};

// 상품 등록
const createProduct = async ({ data }) => {
  const endPoint = new URL("/products", baseURL);

  try {
    const res = await fetch(endPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log("상품 등록 성공");
      return await res.json();
    }

    const errorMessage =
      res.status === 404
        ? "상품 등록 실패(404)"
        : `Failed to create product: ${await res.text()}`;
    throw new Error(errorMessage);
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    throw new Error(`Product creation failed: ${error.message}`);
  }
};

// 상품 업데이트
const patchProduct = async ({ id, productData }) => {
  console.log(productData);
  try {
    const endPoint = `${baseURL}/products/${id}`;
    console.log(endPoint);
    const response = await fetch(endPoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("상품 업데이트 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("updating product 오류:", error.message);
    throw new Error("Failed to update product");
  }
};

//상품 삭제
const deleteProduct = async ({ id }) => {
  const endPoint = `${baseURL}/products/${id}`;
  if (!id) {
    throw new Error("유효하지 않은 ID");
  }

  try {
    const response = await fetch(endPoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return response.status === 204
        ? { message: "성공적으로 삭제됨" }
        : await response.json();
    }

    if (response.status === 404) {
      return { message: "상품을 찾을 수 없음(404)" };
    }

    const errorText = await response.text();
    throw new Error(`상품 삭제 실패: ${errorText}`);
  } catch (error) {
    console.error("상품 삭제 오류:", error.message);
    throw error;
  }
};

const ProductService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
export default ProductService;
