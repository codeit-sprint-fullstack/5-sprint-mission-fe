import { hasToken } from "./authService";

// API URL 상수
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 상품 목록 조회 API
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.pageSize - 페이지당 상품 수
 * @param {string} params.orderBy - 정렬 기준 (recent, price 등)
 * @param {string} params.keyword - 검색 키워드
 */
export const getProducts = async (params = {}) => {
  try {
    // 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();

    // 페이지 번호 (기본값: 1)
    if (params.page) {
      queryParams.append("page", params.page);
    }

    // 페이지 크기 (기본값: 10)
    if (params.pageSize) {
      queryParams.append("pageSize", params.pageSize);
    }

    // 정렬 방식
    if (params.orderBy) {
      // 정렬 방식 매핑 (UI에서 사용하는 값 -> API 파라미터로 변환)
      const orderByMap = {
        latest: "recent",
        price: "price",
      };

      const apiOrderBy = orderByMap[params.orderBy] || params.orderBy;
      queryParams.append("orderBy", apiOrderBy);
    }

    // 검색어
    if (params.keyword) {
      queryParams.append("keyword", params.keyword);
    }

    // 쿼리 문자열 생성
    const queryString = queryParams.toString();
    const url = `${API_URL}/products${queryString ? "?" + queryString : ""}`;

    // API 요청
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(hasToken() && {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }),
      },
    });

    // 응답 확인
    if (!response.ok) {
      throw new Error(
        `상품 목록을 가져오는데 실패했습니다: ${response.status}`
      );
    }

    // 응답 데이터 파싱
    const data = await response.json();

    // 데이터 구조 변환
    let items = [];
    let totalCount = 0;

    if (Array.isArray(data)) {
      // 응답이 배열인 경우
      items = data;
      totalCount = data.length;
    } else if (data && typeof data === "object") {
      // 응답이 객체인 경우
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
        // 데이터에서 배열 형태의 속성 찾기
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value) && value.length > 0) {
            items = value;
            break;
          }
        }
        totalCount = data.totalCount || data.total || items.length;
      }
    }

    // 각 아이템의 필드 표준화
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
      ...item, // 기존 데이터도 유지
    }));

    // API 응답 구조와 동일한 형태로 반환 (list와 items 둘 다 제공)
    return {
      items: formattedItems,
      list: formattedItems, // API 응답과 동일한 키 추가
      totalCount,
      page: parseInt(params.page) || 1,
      pageSize: parseInt(params.pageSize) || formattedItems.length,
    };
  } catch (error) {
    console.error("상품 목록 조회 오류:", error);
    throw error;
  }
};

/**
 * 상품 상세 정보 조회 API
 * @param {string} productId - 상품 ID
 */
export const getProductDetail = async (productId) => {
  try {
    // 헤더 설정
    const headers = {
      "Content-Type": "application/json",
    };

    // 로그인한 경우 토큰 추가
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    // API 요청
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "GET",
      headers,
    });

    // 응답 확인
    if (!response.ok) {
      throw new Error(
        `상품 정보를 가져오는데 실패했습니다: ${response.status}`
      );
    }

    // 응답 데이터 파싱
    const data = await response.json();

    // 응답 데이터 구조 확인 및 변환
    console.log("상품 상세 API 응답 데이터:", data);
    console.log("좋아요 상태 확인:", {
      isFavorite: data.isFavorite,
      favoriteCount: data.favoriteCount,
    });

    // 이미지 관련 데이터 로깅
    console.log("상품 이미지 데이터:", data.images);
    console.log("작성자 정보:", data.author);
    console.log("소유자 정보:", {
      id: data.ownerId,
      nickname: data.ownerNickname,
    });

    // 필요한 속성이 없는 경우 기본값 제공
    const product = {
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
      ...data, // 기존 데이터도 유지
    };

    console.log("변환된 상품 상세 데이터:", product);

    return product;
  } catch (error) {
    console.error("상품 상세 조회 오류:", error);
    throw error;
  }
};

/**
 * 상품 좋아요 토글
 * @param {number|string} productId - 상품 ID
 * @param {boolean} willLike - 좋아요 설정 상태 (true: 좋아요 추가, false: 좋아요 취소)
 * @returns {Promise<Object>} 좋아요 처리 결과 (favoriteCount, isFavorite 포함)
 */
export const toggleProductFavorite = async (productId, willLike) => {
  if (!productId) {
    console.error("상품 ID가 없어 좋아요를 처리할 수 없습니다.");
    throw new Error("상품 ID가 필요합니다.");
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.error("서버에서는 좋아요를 처리할 수 없습니다.");
      return null;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      throw new Error("로그인이 필요합니다.");
    }

    // 숫자로 변환
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) {
      console.error("유효하지 않은 상품 ID:", productId);
      throw new Error("유효하지 않은 상품 ID입니다.");
    }

    const apiUrl = `${API_URL}/products/${numericProductId}/favorite`;
    console.log("좋아요 토글 API 호출:", apiUrl);
    console.log("설정할 좋아요 상태:", { willLike });

    // 좋아요 상태에 따라 메서드 결정
    const method = willLike ? "POST" : "DELETE";

    // API 요청 설정
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // POST 메서드인 경우에만 body 포함
    if (method === "POST") {
      requestOptions.body = JSON.stringify({ isFavorite: true });
    }

    console.log(
      `${method} 요청으로 좋아요를 ${willLike ? "추가" : "취소"}합니다`
    );

    const response = await fetch(apiUrl, requestOptions);

    console.log("좋아요 토글 응답 상태:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("좋아요 토글 실패:", errorData);
      throw new Error(errorData.message || "좋아요 처리에 실패했습니다.");
    }

    // API 응답 처리
    let data;
    try {
      data = await response.json();
      console.log("좋아요 토글 성공:", data);
    } catch (e) {
      // DELETE 요청의 경우 응답 본문이 없을 수 있음
      console.log("응답 본문이 없거나 JSON이 아닌 경우:", e);
      // DELETE 요청에 대한 기본 응답 생성
      data = {
        favoriteCount: 0, // 정확한 값은 API 응답에 따라 조정
        isFavorite: false,
      };
    }

    // API 응답에서 필요한 데이터 추출
    const result = {
      favoriteCount: data.favoriteCount ?? 0,
      isFavorite: willLike, // 요청한 상태로 설정
      ...data,
    };

    console.log("좋아요 토글 응답 처리 결과:", result);
    return result;
  } catch (error) {
    console.error("좋아요 토글 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 상품 생성 API
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

    if (!response.ok) {
      throw new Error(`상품 등록 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("상품 생성 오류:", error);
    throw error;
  }
};

/**
 * 상품 수정 API
 */
export const updateProduct = async (productId, productData) => {
  if (!productId) {
    console.error("상품 ID가 없어 수정할 수 없습니다.");
    throw new Error("상품 ID가 필요합니다.");
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.error("서버에서는 상품을 수정할 수 없습니다.");
      return null;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      throw new Error("로그인이 필요합니다.");
    }

    // 숫자로 변환
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) {
      console.error("유효하지 않은 상품 ID:", productId);
      throw new Error("유효하지 않은 상품 ID입니다.");
    }

    // API 문서에 맞게 요청 데이터 구성
    const requestData = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      tags: productData.tags,
      images: productData.images,
    };

    const apiUrl = `${API_URL}/products/${numericProductId}`;
    console.log("상품 수정 API 호출:", apiUrl);
    console.log("요청 데이터:", requestData);

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    console.log("상품 수정 응답 상태:", response.status);

    if (!response.ok) {
      let errorMessage = "상품 수정에 실패했습니다.";

      try {
        const errorData = await response.json();
        console.error("상품 수정 실패:", errorData);

        if (response.status === 403) {
          errorMessage =
            "상품을 수정할 권한이 없습니다. 자신이 등록한 상품만 수정할 수 있습니다.";
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.error("오류 응답 파싱 실패:", e);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("상품 수정 성공:", data);
    return data;
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 상품 삭제 API
 */
export const deleteProduct = async (productId) => {
  if (!productId) {
    console.error("상품 ID가 없어 삭제할 수 없습니다.");
    throw new Error("상품 ID가 필요합니다.");
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.error("서버에서는 상품을 삭제할 수 없습니다.");
      return null;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      throw new Error("로그인이 필요합니다.");
    }

    // 숫자로 변환
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) {
      console.error("유효하지 않은 상품 ID:", productId);
      throw new Error("유효하지 않은 상품 ID입니다.");
    }

    const apiUrl = `${API_URL}/products/${numericProductId}`;
    console.log("상품 삭제 API 호출:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("상품 삭제 응답 상태:", response.status);

    if (!response.ok) {
      let errorMessage = "상품 삭제에 실패했습니다.";

      try {
        const errorData = await response.json();
        console.error("상품 삭제 실패:", errorData);

        if (response.status === 403) {
          errorMessage =
            "상품을 삭제할 권한이 없습니다. 자신이 등록한 상품만 삭제할 수 있습니다.";
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.error("오류 응답 파싱 실패:", e);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("상품 삭제 성공:", data);
    return data;
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 상품 댓글 조회 API
 */
export const getProductComments = async (
  productId,
  limit = 5,
  cursor = null
) => {
  if (!productId) {
    console.error("상품 ID가 없어 댓글을 조회할 수 없습니다.");
    return { comments: [], totalCount: 0 };
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.log("서버에서 댓글 조회 시도 - 빈 배열 반환");
      return { comments: [], totalCount: 0 };
    }

    // 숫자로 변환
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) {
      console.error("유효하지 않은 상품 ID:", productId);
      return { comments: [], totalCount: 0 };
    }

    // API 문서에 맞게 URL 구성
    let apiUrl = `${API_URL}/products/${numericProductId}/comments?limit=${limit}`;
    if (cursor) {
      apiUrl += `&cursor=${cursor}`;
    }

    console.log("댓글 조회 API 호출:", apiUrl);

    // 헤더 설정 - 로그인 여부에 따라 토큰 포함 여부 결정
    const headers = {
      "Content-Type": "application/json",
    };

    // 토큰이 있는 경우 헤더에 추가
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });

    console.log("댓글 조회 응답 상태:", response.status);

    if (!response.ok) {
      console.error(`댓글 조회 실패: ${response.status}`);
      return { comments: [], totalCount: 0 };
    }

    const data = await response.json();
    console.log("댓글 조회 성공:", data);

    // 응답 데이터 구조 확인 및 변환
    let comments = [];

    if (data && Array.isArray(data)) {
      comments = data;
    } else if (data && typeof data === "object") {
      if (Array.isArray(data.list)) {
        comments = data.list;
      } else if (Array.isArray(data.comments)) {
        comments = data.comments;
      } else if (Array.isArray(data.data)) {
        comments = data.data;
      }
    }

    // 댓글 데이터 구조 표준화
    const formattedComments = comments.map((comment) => {
      // API 응답 로깅 (디버깅용)
      console.log("원본 댓글 데이터:", comment);

      return {
        id: comment.id,
        content: comment.content || comment.text || "",
        createdAt: comment.createdAt || new Date().toISOString(),
        updatedAt:
          comment.updatedAt || comment.createdAt || new Date().toISOString(),
        // writer 필드에서 작성자 정보 추출 (API 응답 구조에 맞게 수정)
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
        ...comment, // 기존 데이터도 유지
      };
    });

    console.log("변환된 댓글 데이터:", formattedComments);

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

/**
 * 상품 댓글 생성 API
 */
export const createProductComment = async ({ productId, content }) => {
  if (!productId) {
    console.error("상품 ID가 없어 댓글을 생성할 수 없습니다.");
    throw new Error("상품 ID가 필요합니다.");
  }

  if (!content || !content.trim()) {
    console.error("댓글 내용이 없어 댓글을 생성할 수 없습니다.");
    throw new Error("댓글 내용이 필요합니다.");
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.error("서버에서는 댓글을 생성할 수 없습니다.");
      return null;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      throw new Error("로그인이 필요합니다.");
    }

    // 숫자로 변환
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) {
      console.error("유효하지 않은 상품 ID:", productId);
      throw new Error("유효하지 않은 상품 ID입니다.");
    }

    // API 문서에 맞게 URL 구성
    const apiUrl = `${API_URL}/products/${numericProductId}/comments`;
    console.log("댓글 생성 API 호출:", apiUrl);
    console.log("요청 데이터:", { content });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    console.log("댓글 생성 응답 상태:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("댓글 생성 실패:", errorData);
      throw new Error(errorData.message || "댓글 생성에 실패했습니다.");
    }

    const data = await response.json();
    console.log("댓글 생성 성공:", data);

    // API 응답을 형식화: writer -> author로 변환
    const formattedComment = {
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
      isMine: true, // 내가 작성한 댓글이므로 true로 설정
      ...data, // 기존 데이터도 유지
    };

    console.log("형식화된 댓글 데이터:", formattedComment);
    return formattedComment;
  } catch (error) {
    console.error("댓글 생성 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 상품 댓글 수정 API
 */
export const updateProductComment = async ({ commentId, content }) => {
  if (!commentId) {
    console.error("댓글 ID가 없어 수정할 수 없습니다.");
    throw new Error("댓글 ID가 필요합니다.");
  }

  if (!content || !content.trim()) {
    console.error("댓글 내용이 없어 수정할 수 없습니다.");
    throw new Error("댓글 내용이 필요합니다.");
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.error("서버에서는 댓글을 수정할 수 없습니다.");
      return null;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      throw new Error("로그인이 필요합니다.");
    }

    // 숫자로 변환
    const numericCommentId = Number(commentId);
    if (isNaN(numericCommentId)) {
      console.error("유효하지 않은 댓글 ID:", commentId);
      throw new Error("유효하지 않은 댓글 ID입니다.");
    }

    // API 문서에 맞게 URL 구성
    const apiUrl = `${API_URL}/comments/${numericCommentId}`;
    console.log("댓글 수정 API 호출:", apiUrl);
    console.log("요청 데이터:", { content });

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    console.log("댓글 수정 응답 상태:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("댓글 수정 실패:", errorData);
      throw new Error(errorData.message || "댓글 수정에 실패했습니다.");
    }

    const data = await response.json();
    console.log("댓글 수정 성공:", data);

    // API 응답을 형식화: writer -> author로 변환
    const formattedComment = {
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
      isMine: true, // 내가 수정한 댓글이므로 true로 설정
      ...data, // 기존 데이터도 유지
    };

    console.log("형식화된 업데이트 댓글 데이터:", formattedComment);
    return formattedComment;
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 상품 댓글 삭제 API
 */
export const deleteProductComment = async ({ commentId }) => {
  if (!commentId) {
    console.error("댓글 ID가 없어 삭제할 수 없습니다.");
    throw new Error("댓글 ID가 필요합니다.");
  }

  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.error("서버에서는 댓글을 삭제할 수 없습니다.");
      return null;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      throw new Error("로그인이 필요합니다.");
    }

    // 숫자로 변환
    const numericCommentId = Number(commentId);
    if (isNaN(numericCommentId)) {
      console.error("유효하지 않은 댓글 ID:", commentId);
      throw new Error("유효하지 않은 댓글 ID입니다.");
    }

    // API 문서에 맞게 URL 구성
    const apiUrl = `${API_URL}/comments/${numericCommentId}`;
    console.log("댓글 삭제 API 호출:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("댓글 삭제 응답 상태:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("댓글 삭제 실패:", errorData);
      throw new Error(errorData.message || "댓글 삭제에 실패했습니다.");
    }

    console.log("댓글 삭제 성공");
    return true;
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    throw error;
  }
};
/**
 * 사용자 권한 확인
 */
export const checkUserPermission = (targetUserId) => {
  try {
    // 서버에서 실행되는 경우 처리
    if (typeof window === "undefined") {
      console.log("서버에서 권한 확인 시도 - false 반환");
      return false;
    }

    // 로그인 여부 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("권한 확인: 로그인되지 않음");
      return false;
    }

    // 대상 사용자 ID가 없는 경우
    if (!targetUserId) {
      console.log("권한 확인: 대상 사용자 ID가 없음");
      return false;
    }

    // JWT 토큰에서 사용자 ID 추출
    try {
      // JWT 토큰 디코딩
      const base64Url = token.split(".")[1];
      if (!base64Url) {
        console.log("권한 확인: 유효하지 않은 토큰 형식");
        return false;
      }

      // 브라우저 환경에서만 실행
      if (typeof window !== "undefined" && typeof atob === "function") {
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const payload = JSON.parse(jsonPayload);

        // 토큰에서 사용자 ID를 찾기 위한 가능한 필드들
        const currentUserId = payload.id || payload.userId || payload.sub;

        if (!currentUserId) {
          console.log("권한 확인: 토큰에서 사용자 ID를 찾을 수 없음");
          // 대체 방법으로 localStorage에서 사용자 정보 찾기
          return checkUserInfoFromLocalStorage(targetUserId);
        }

        // 두 ID를 숫자로 변환하여 비교
        const numericCurrentUserId = Number(currentUserId);
        const numericTargetUserId = Number(targetUserId);

        console.log("권한 확인 (토큰 사용):", {
          currentUserId: numericCurrentUserId,
          targetUserId: numericTargetUserId,
          isMatch: numericCurrentUserId === numericTargetUserId,
        });

        return numericCurrentUserId === numericTargetUserId;
      } else {
        // atob 함수를 사용할 수 없는 환경에서는 localStorage에서 사용자 정보 찾기
        return checkUserInfoFromLocalStorage(targetUserId);
      }
    } catch (tokenError) {
      console.error("토큰 디코딩 오류:", tokenError);
      // 토큰 디코딩에 실패한 경우 localStorage에서 사용자 정보 찾기
      return checkUserInfoFromLocalStorage(targetUserId);
    }
  } catch (error) {
    console.error("권한 확인 중 오류 발생:", error);
    return false;
  }
};

// localStorage에서 사용자 정보를 찾아 권한 확인
function checkUserInfoFromLocalStorage(targetUserId) {
  console.log("localStorage에서 사용자 정보 찾기 시도");

  // 다양한 키로 사용자 정보 찾기 시도
  const possibleKeys = ["userInfo", "user", "currentUser"];

  for (const key of possibleKeys) {
    try {
      const userInfoStr = localStorage.getItem(key);
      if (userInfoStr) {
        console.log(`localStorage에서 사용자 정보 발견: ${key}`);
        const userInfo = JSON.parse(userInfoStr);

        // 사용자 ID 필드 추출 (다양한 가능한 필드명)
        const currentUserId =
          userInfo.id || userInfo.userId || userInfo.user_id;

        if (currentUserId) {
          // ID 비교
          const numericCurrentUserId = Number(currentUserId);
          const numericTargetUserId = Number(targetUserId);

          console.log(`권한 확인 (${key} 사용):`, {
            currentUserId: numericCurrentUserId,
            targetUserId: numericTargetUserId,
            isMatch: numericCurrentUserId === numericTargetUserId,
          });

          return numericCurrentUserId === numericTargetUserId;
        }
      }
    } catch (e) {
      console.error(`localStorage ${key} 파싱 오류:`, e);
    }
  }

  console.log("localStorage에서 사용자 정보를 찾을 수 없음");
  return false;
}
