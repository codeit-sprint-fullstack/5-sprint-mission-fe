import instance from "@/services/api/axios";

//const BASE_URL = "https://panda-market-api.vercel.app/products";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/products";

export const addFavorite = async (productId) => {
  try {
    const response = await instance.post(`/products/${productId}/favorite`);
    return response.data;
  } catch (error) {
    console.error("좋아요 추가 실패:", error);
    throw error;
  }
};

// 좋아요 취소 함수
export const removeFavorite = async (productId) => {
  try {
    const response = await instance.delete(`/products/${productId}/favorite`);
    return response.data;
  } catch (error) {
    console.error("좋아요 취소 실패:", error);
    throw error;
  }
};

export const fetchProducts = async ({
  orderBy = "recent",
  page = "1",
  pageSize = "10",
  search = "",
}) => {
  try {
    const apiEndpoint = `${BASE_URL}?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${encodeURIComponent(
      search
    )}`;
    const response = await instance.get(apiEndpoint);

    if (response.data && Array.isArray(response.data.list)) {
      return {
        list: response.data.list,
        totalCount: response.data.totalCount || 0, // totalCount 추가
      };
    } else {
      console.error(
        "API response does not contain a valid list:",
        response.data
      );
      return { list: [], totalCount: 0 };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { list: [], totalCount: 0 };
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await instance.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// export const toggleFavorite = async ({ productId, isFavorite }) => {
//   try {
//     // isFavorite 값을 반전시켜 서버로 보내기
//     const response = await instance.post(`${BASE_URL}/${productId}/favorite`, {
//       isFavorite: !isFavorite,
//     });
//     return response.data; // 변경된 데이터 반환
//   } catch (error) {
//     console.error("Error toggling favorite:", error);
//     throw error;
//   }
// };

export const createProduct = async (data) => {
  try {
    let formData;

    // 이미 FormData 객체인 경우 그대로 사용
    if (data instanceof FormData) {
      formData = data;
    }
    // JSON 객체인 경우 FormData로 변환
    else {
      formData = new FormData();
      const { name, description, price, images, tags } = data;

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      // 이미지가 URL 배열인 경우
      if (images && Array.isArray(images)) {
        // 이미지가 URL 문자열인 경우
        if (typeof images[0] === "string") {
          formData.append("images", JSON.stringify(images));
        }
        // 이미지가 File 객체인 경우
        else {
          images.forEach((image) => {
            formData.append("images", image);
          });
        }
      }

      // 태그 처리 - 배열이면 쉼표로 구분된 문자열로 변환
      if (tags) {
        if (Array.isArray(tags)) {
          formData.append("tags", tags.join(","));
        } else {
          formData.append("tags", tags);
        }
      }
    }

    // 요청 로깅
    console.log(
      "createProduct 요청 데이터:",
      Array.from(formData.entries()).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {})
    );

    const response = await instance.post(`${BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("상품 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("상품 등록 에러:", error);

    // 서버에서 받은 에러 메시지
    if (error.response) {
      console.error("서버 에러 메시지:", error.response.data);
    } else {
      console.error("네트워크 또는 다른 오류 발생:", error.message);
    }

    throw error;
  }
};

// 상품 수정 함수
export const updateProduct = async (data) => {
  if (!data.name || !data.description || !data.price) {
    throw new Error("Missing required fields");
  }

  try {
    let formData;

    // 이미 FormData 객체인 경우 그대로 사용
    if (data instanceof FormData) {
      formData = data;
      // ID가 FormData에 없는 경우 추가
      if (!formData.has("id") && data.id) {
        formData.append("id", data.id);
      }
    }
    // JSON 객체인 경우 FormData로 변환
    else {
      const { id, imageUrl, imageFile, ...restData } = data;

      formData = new FormData();

      // 기본 필드 추가
      Object.entries(restData).forEach(([key, value]) => {
        if (key !== "images" && key !== "tags" && value !== undefined) {
          formData.append(key, value);
        }
      });

      // 태그 처리
      if (restData.tags) {
        if (Array.isArray(restData.tags)) {
          formData.append("tags", restData.tags.join(","));
        } else {
          formData.append("tags", restData.tags);
        }
      }

      // 이미지 처리
      if (imageFile) {
        // 파일 객체가 있으면 파일 업로드
        formData.append("images", imageFile);
      } else if (imageUrl) {
        // URL만 있는 경우 기존 이미지 URL 유지
        formData.append("existingImages", JSON.stringify([imageUrl]));
      }
    }

    // 로깅
    console.log(
      "updateProduct 요청 데이터:",
      Array.from(formData.entries()).reduce((obj, [key, value]) => {
        obj[key] = typeof value === "object" ? "(File 객체)" : value;
        return obj;
      }, {})
    );

    const response = await instance.patch(`${BASE_URL}/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Updated product:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await instance.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const fetchProductComments = async (productId, limit = 10) => {
  const response = await instance.get(`${BASE_URL}/${productId}/comments`, {
    params: { limit },
  });
  return response.data;
};
