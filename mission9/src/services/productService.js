import { hasToken } from "./authService";

/* 기능: API 설정 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 기능: 상품 목록 조회
 * @param {Object} params - 조회 조건 매개변수
 * @returns {Promise<Object>} 상품 목록 및 페이지 정보
 */
export const getProducts = async (params = {}) => {
  try {
    /* 로직: 쿼리 파라미터 구성 */
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.pageSize) queryParams.append("pageSize", params.pageSize);

    if (params.orderBy) {
      const orderByMap = { latest: "recent", price: "price" };
      const apiOrderBy = orderByMap[params.orderBy] || params.orderBy;
      queryParams.append("orderBy", apiOrderBy);
    }

    if (params.keyword) queryParams.append("keyword", params.keyword);

    /* 로직: API 요청 수행 */
    const queryString = queryParams.toString();
    const url = `${API_URL}/products${queryString ? "?" + queryString : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(hasToken() && {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }),
      },
    });

    if (!response.ok) {
      throw new Error(
        `상품 목록을 가져오는데 실패했습니다: ${response.status}`
      );
    }

    /* 로직: 응답 데이터 표준화 */
    const data = await response.json();
    let items = [];
    let totalCount = 0;

    if (Array.isArray(data)) {
      items = data;
      totalCount = data.length;
    } else if (data && typeof data === "object") {
      if (Array.isArray(data.list)) {
        items = data.list;
        totalCount = data.totalCount || data.list.length;
      } else if (Array.isArray(data.items)) {
        items = data.items;
        totalCount = data.totalCount || data.items.length;
      } else if (Array.isArray(data.products)) {
        items = data.products;
        totalCount = data.totalCount || data.products.length;
      } else if (Array.isArray(data.data)) {
        items = data.data;
        totalCount = data.totalCount || data.total || data.data.length;
      } else {
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value) && value.length > 0) {
            items = value;
            break;
          }
        }
        totalCount = data.totalCount || data.total || items.length;
      }
    }

    /* 로직: 상품 데이터 필드 표준화 */
    const formattedItems = items.map((item) => ({
      id: item.id,
      title: item.title || item.name || "제목 없음",
      price: item.price || 0,
      description: item.description || item.content || "",
      image:
        item.image ||
        (item.images && item.images.length > 0 ? item.images[0] : ""),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
      ...item,
    }));

    return {
      items: formattedItems,
      list: formattedItems,
      totalCount,
      page: parseInt(params.page) || 1,
      pageSize: parseInt(params.pageSize) || formattedItems.length,
    };
  } catch (error) {
    console.error("상품 목록 조회 오류:", error);
    throw error;
  }
};

/* 기능: 상품 상세 정보 조회
 * @param {string|number} productId - 상품 ID
 * @returns {Promise<Object>} 상품 상세 정보
 */
export const getProductDetail = async (productId) => {
  try {
    /* 로직: 헤더 설정 및 인증 처리 */
    const headers = {
      "Content-Type": "application/json",
    };

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    /* 로직: API 요청 수행 */
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `상품 정보를 가져오는데 실패했습니다: ${response.status}`
      );
    }

    /* 로직: 응답 데이터 표준화 */
    const data = await response.json();
    return {
      id: data.id || productId,
      title: data.title || data.name || "제목 없음",
      content: data.content || data.description || "",
      price: data.price || 0,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
      viewCount: data.viewCount || data.views || 0,
      favoriteCount: data.favoriteCount || data.likeCount || 0,
      isFavorite: data.isFavorite || false,
      images: data.images || (data.image ? [data.image] : []),
      author: {
        id:
          data.author?.id || data.ownerId || data.userId || data.authorId || "",
        nickname:
          data.author?.nickname ||
          data.ownerNickname ||
          data.userNickname ||
          data.authorName ||
          "익명",
        image:
          data.author?.image ||
          (data.images && data.images.length > 0
            ? data.images[0]
            : "/ic_profile.svg"),
      },
      userId:
        data.userId || data.authorId || data.ownerId || data.author?.id || "",
      ...data,
    };
  } catch (error) {
    console.error("상품 상세 조회 오류:", error);
    throw error;
  }
};

/* 기능: 상품 좋아요 토글
 * @param {number|string} productId - 상품 ID
 * @param {boolean} willLike - 좋아요 설정 상태
 * @returns {Promise<Object>} 좋아요 처리 결과
 */
export const toggleProductFavorite = async (productId, willLike) => {
  if (!productId) throw new Error("상품 ID가 필요합니다.");

  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const numericProductId = Number(productId);
    if (isNaN(numericProductId))
      throw new Error("유효하지 않은 상품 ID입니다.");

    /* 로직: API 요청 수행 */
    const apiUrl = `${API_URL}/products/${numericProductId}/favorite`;
    const method = willLike ? "POST" : "DELETE";
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (method === "POST") {
      requestOptions.body = JSON.stringify({ isFavorite: true });
    }

    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "좋아요 처리에 실패했습니다.");
    }

    /* 로직: 응답 처리 */
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { favoriteCount: 0, isFavorite: false };
    }

    return {
      favoriteCount: data.favoriteCount ?? 0,
      isFavorite: willLike,
      ...data,
    };
  } catch (error) {
    console.error("좋아요 토글 중 오류 발생:", error);
    throw error;
  }
};

/* 기능: 상품 생성
 * @param {Object} productData - 생성할 상품 데이터
 * @returns {Promise<Object>} 생성된 상품 정보
 */
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error(`상품 등록 실패: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("상품 생성 오류:", error);
    throw error;
  }
};

/* 기능: 상품 수정
 * @param {string|number} productId - 상품 ID
 * @param {Object} productData - 수정할 상품 데이터
 * @returns {Promise<Object>} 수정된 상품 정보
 */
export const updateProduct = async (productId, productData) => {
  if (!productId) throw new Error("상품 ID가 필요합니다.");

  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const numericProductId = Number(productId);
    if (isNaN(numericProductId))
      throw new Error("유효하지 않은 상품 ID입니다.");

    /* 로직: API 요청 수행 */
    const requestData = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      tags: productData.tags,
      images: productData.images,
    };

    const response = await fetch(`${API_URL}/products/${numericProductId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      let errorMessage = "상품 수정에 실패했습니다.";
      try {
        const errorData = await response.json();
        if (response.status === 403) {
          errorMessage =
            "상품을 수정할 권한이 없습니다. 자신이 등록한 상품만 수정할 수 있습니다.";
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {}
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    throw error;
  }
};

/* 기능: 상품 삭제
 * @param {string|number} productId - 상품 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteProduct = async (productId) => {
  if (!productId) throw new Error("상품 ID가 필요합니다.");

  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const numericProductId = Number(productId);
    if (isNaN(numericProductId))
      throw new Error("유효하지 않은 상품 ID입니다.");

    /* 로직: API 요청 수행 */
    const response = await fetch(`${API_URL}/products/${numericProductId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = "상품 삭제에 실패했습니다.";
      try {
        const errorData = await response.json();
        if (response.status === 403) {
          errorMessage =
            "상품을 삭제할 권한이 없습니다. 자신이 등록한 상품만 삭제할 수 있습니다.";
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {}
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    throw error;
  }
};

/* 기능: 상품 댓글 조회
 * @param {string|number} productId - 상품 ID
 * @param {number} limit - 한 번에 조회할 댓글 수
 * @param {string} cursor - 다음 페이지 조회를 위한 커서
 * @returns {Promise<Object>} 댓글 목록과 메타데이터
 */
export const getProductComments = async (
  productId,
  limit = 5,
  cursor = null
) => {
  if (!productId) return { comments: [], totalCount: 0 };

  try {
    /* 로직: 환경 및 유효성 검사 */
    if (typeof window === "undefined") return { comments: [], totalCount: 0 };
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) return { comments: [], totalCount: 0 };

    /* 로직: API 요청 준비 */
    let apiUrl = `${API_URL}/products/${numericProductId}/comments?limit=${limit}`;
    if (cursor) apiUrl += `&cursor=${cursor}`;

    const headers = {
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem("accessToken");
    if (token) headers.Authorization = `Bearer ${token}`;

    /* 로직: API 요청 수행 */
    const response = await fetch(apiUrl, { method: "GET", headers });
    if (!response.ok) return { comments: [], totalCount: 0 };

    /* 로직: 응답 데이터 표준화 */
    const data = await response.json();
    let comments = [];

    if (data && Array.isArray(data)) {
      comments = data;
    } else if (data && typeof data === "object") {
      if (Array.isArray(data.list)) comments = data.list;
      else if (Array.isArray(data.comments)) comments = data.comments;
      else if (Array.isArray(data.data)) comments = data.data;
    }

    const formattedComments = comments.map((comment) => ({
      id: comment.id,
      content: comment.content || comment.text || "",
      createdAt: comment.createdAt || new Date().toISOString(),
      updatedAt:
        comment.updatedAt || comment.createdAt || new Date().toISOString(),
      author: {
        id:
          comment.writer?.id ||
          comment.author?.id ||
          comment.userId ||
          comment.authorId ||
          "",
        nickname:
          comment.writer?.nickname ||
          comment.author?.nickname ||
          comment.userNickname ||
          comment.authorName ||
          "익명",
        image: comment.writer?.image || comment.author?.image || "",
      },
      userId:
        comment.writer?.id ||
        comment.userId ||
        comment.authorId ||
        comment.author?.id ||
        "",
      isMine: comment.isMine || false,
      ...comment,
    }));

    return {
      comments: formattedComments,
      totalCount: formattedComments.length,
      nextCursor: data.nextCursor,
    };
  } catch (error) {
    console.error("댓글 조회 중 오류 발생:", error);
    return { comments: [], totalCount: 0 };
  }
};

/* 기능: 상품 댓글 생성
 * @param {Object} params - 댓글 생성 매개변수
 * @returns {Promise<Object>} 생성된 댓글 정보
 */
export const createProductComment = async ({ productId, content }) => {
  if (!productId) throw new Error("상품 ID가 필요합니다.");
  if (!content?.trim()) throw new Error("댓글 내용이 필요합니다.");

  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const numericProductId = Number(productId);
    if (isNaN(numericProductId))
      throw new Error("유효하지 않은 상품 ID입니다.");

    /* 로직: API 요청 수행 */
    const response = await fetch(
      `${API_URL}/products/${numericProductId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "댓글 생성에 실패했습니다.");
    }

    /* 로직: 응답 데이터 표준화 */
    const data = await response.json();
    return {
      id: data.id,
      content: data.content || "",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
      author: {
        id: data.writer?.id || "",
        nickname: data.writer?.nickname || "익명",
        image: data.writer?.image || "",
      },
      userId: data.writer?.id || "",
      isMine: true,
      ...data,
    };
  } catch (error) {
    console.error("댓글 생성 중 오류 발생:", error);
    throw error;
  }
};

/* 기능: 상품 댓글 수정
 * @param {Object} params - 댓글 수정 매개변수
 * @returns {Promise<Object>} 수정된 댓글 정보
 */
export const updateProductComment = async ({ commentId, content }) => {
  if (!commentId) throw new Error("댓글 ID가 필요합니다.");
  if (!content?.trim()) throw new Error("댓글 내용이 필요합니다.");

  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const numericCommentId = Number(commentId);
    if (isNaN(numericCommentId))
      throw new Error("유효하지 않은 댓글 ID입니다.");

    /* 로직: API 요청 수행 */
    const response = await fetch(`${API_URL}/comments/${numericCommentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "댓글 수정에 실패했습니다.");
    }

    /* 로직: 응답 데이터 표준화 */
    const data = await response.json();
    return {
      id: data.id,
      content: data.content || "",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
      author: {
        id: data.writer?.id || "",
        nickname: data.writer?.nickname || "익명",
        image: data.writer?.image || "",
      },
      userId: data.writer?.id || "",
      isMine: true,
      ...data,
    };
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    throw error;
  }
};

/* 기능: 상품 댓글 삭제
 * @param {Object} params - 댓글 삭제 매개변수
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export const deleteProductComment = async ({ commentId }) => {
  if (!commentId) throw new Error("댓글 ID가 필요합니다.");

  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const numericCommentId = Number(commentId);
    if (isNaN(numericCommentId))
      throw new Error("유효하지 않은 댓글 ID입니다.");

    /* 로직: API 요청 수행 */
    const response = await fetch(`${API_URL}/comments/${numericCommentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "댓글 삭제에 실패했습니다.");
    }

    return true;
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    throw error;
  }
};

/* 기능: 사용자 권한 확인
 * @param {string|number} targetUserId - 대상 리소스의 소유자 ID
 * @returns {boolean} 권한 여부
 */
export const checkUserPermission = (targetUserId) => {
  try {
    /* 로직: 환경 및 인증 체크 */
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("accessToken");
    if (!token || !targetUserId) return false;

    /* 로직: JWT 토큰 검증 */
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return false;

      if (typeof window !== "undefined" && typeof atob === "function") {
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );

        const payload = JSON.parse(jsonPayload);
        const currentUserId = payload.id || payload.userId || payload.sub;

        if (!currentUserId) return checkUserInfoFromLocalStorage(targetUserId);

        return Number(currentUserId) === Number(targetUserId);
      }
      return checkUserInfoFromLocalStorage(targetUserId);
    } catch (tokenError) {
      return checkUserInfoFromLocalStorage(targetUserId);
    }
  } catch (error) {
    console.error("권한 확인 중 오류 발생:", error);
    return false;
  }
};

/* 로직: localStorage에서 사용자 정보 확인
 * @param {string|number} targetUserId - 대상 리소스의 소유자 ID
 * @returns {boolean} 권한 여부
 */
function checkUserInfoFromLocalStorage(targetUserId) {
  const possibleKeys = ["userInfo", "user", "currentUser"];

  for (const key of possibleKeys) {
    try {
      const userInfoStr = localStorage.getItem(key);
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        const currentUserId =
          userInfo.id || userInfo.userId || userInfo.user_id;

        if (currentUserId) {
          return Number(currentUserId) === Number(targetUserId);
        }
      }
    } catch (e) {
      console.error(`localStorage ${key} 파싱 오류:`, e);
    }
  }

  return false;
}
