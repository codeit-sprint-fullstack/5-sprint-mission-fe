import { hasToken } from "./authService";

// API URL 상수
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 캐시 설정
const cache = new Map();
const CACHE_TIME = 5 * 60 * 1000; // 5분

/**
 * 게시글 캐시 초기화 함수
 */
export function clearArticleCache(articleId = null) {
  if (articleId) {
    console.log(`게시글 ID ${articleId}에 대한 캐시 초기화`);
    // 특정 게시글 캐시만 삭제
    const articleCacheKey = `article_${articleId}`;
    if (cache.has(articleCacheKey)) {
      cache.delete(articleCacheKey);
      console.log(`게시글 캐시 삭제됨: ${articleCacheKey}`);
    }
  }

  console.log("게시글 목록 캐시 초기화");
  // 모든 캐시 키를 순회하며 articles로 시작하는 캐시 항목 삭제
  let deletedCount = 0;
  for (const key of cache.keys()) {
    if (key.startsWith("articles_")) {
      cache.delete(key);
      deletedCount++;
    }
  }
  console.log(`${deletedCount}개의 게시글 목록 캐시 삭제됨`);
}

/**
 * 게시글 목록 조회 API
 */
export async function getArticles({
  page = 1,
  limit = 5,
  search = "",
  sort = "latest",
  skipCache = false,
} = {}) {
  try {
    // 캐시 키 생성
    const cacheKey = `articles_${page}_${limit}_${search}_${sort}`;

    // 캐시 확인 (skipCache가 false일 때만)
    if (!skipCache && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      // 캐시가 유효한지 확인
      if (Date.now() - cachedData.timestamp < CACHE_TIME) {
        console.log(`캐시에서 게시글 목록 가져옴: ${cacheKey}`);
        return cachedData.data;
      } else {
        // 캐시가 만료되었으면 삭제
        console.log(`캐시 만료됨: ${cacheKey}`);
        cache.delete(cacheKey);
      }
    }

    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    queryParams.append("sort", sort);
    if (search) {
      queryParams.append("search", search);
    }

    // API 요청 URL 구성
    const url = `${API_URL}/articles?${queryParams.toString()}`;
    console.log("게시글 목록 조회 API 호출:", url);

    // fetch API로 직접 요청
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(hasToken() && {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }),
      },
    });

    console.log("API 응답 상태:", response.status, response.statusText);

    // 응답이 성공이 아닌 경우
    if (!response.ok) {
      throw new Error(`API 오류: ${response.status} ${response.statusText}`);
    }

    // 응답 본문을 JSON으로 파싱
    const data = await response.json();
    console.log("API 응답 데이터:", data);

    // 응답 데이터 가공
    let responseData;

    if (data.articles && Array.isArray(data.articles)) {
      // 표준 형식의 응답
      responseData = {
        articles: data.articles,
        totalPages: Math.ceil(data.totalCount / limit),
        currentPage: page,
      };
    } else if (Array.isArray(data)) {
      // 배열 형태의 응답
      responseData = {
        articles: data,
        totalPages: 1, // 페이지 정보가 없으면 기본값 설정
        currentPage: 1,
      };
    } else if (typeof data === "object") {
      // 다른 객체 형태의 응답
      let articlesArray = [];

      // 데이터에서 배열 형태의 속성 찾기
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) && value.length > 0) {
          articlesArray = value;
          break;
        }
      }

      responseData = {
        articles: articlesArray,
        totalPages: data.totalPages || Math.ceil(articlesArray.length / limit),
        currentPage: data.currentPage || page,
      };
    } else {
      // 알 수 없는 형태의 응답
      console.error("알 수 없는 응답 형식:", data);
      responseData = {
        articles: [],
        totalPages: 0,
        currentPage: page,
      };
    }

    // 캐시에 저장
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now(),
    });

    console.log(`API에서 게시글 목록 가져옴:`, responseData);
    return responseData;
  } catch (error) {
    console.error("게시글 목록 조회 중 오류 발생:", error);
    // 오류 발생 시 빈 데이터 반환
    return {
      articles: [],
      totalPages: 0,
      currentPage: page,
      error: error.message,
    };
  }
}

/**
 * 게시글 상세 조회 API
 */
export async function getArticleById(id, skipCache = false) {
  try {
    if (!id) {
      throw new Error("게시글 ID가 필요합니다");
    }

    // 캐시 키 생성
    const cacheKey = `article_${id}`;

    // 캐시 확인 (skipCache가 false일 때만)
    if (!skipCache && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      // 캐시가 유효한지 확인
      if (Date.now() - cachedData.timestamp < CACHE_TIME) {
        console.log(`캐시에서 게시글 상세 가져옴: ${cacheKey}`);
        return cachedData.data;
      } else {
        // 캐시가 만료되었으면 삭제
        console.log(`캐시 만료됨: ${cacheKey}`);
        cache.delete(cacheKey);
      }
    }

    // API 요청
    console.log(`게시글 상세 조회 API 호출: ${id}`);
    const url = `${API_URL}/articles/${id}`;
    console.log("게시글 상세 조회 URL:", url);

    // 서버에서 실행 중인지 확인
    const isServer = typeof window === "undefined";
    const headers = {
      "Content-Type": "application/json",
    };

    if (!isServer && hasToken()) {
      headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`게시글 상세 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log(`게시글 상세 데이터:`, data);

    // 로그인한 사용자의 좋아요 상태 확인
    let isLiked = false;
    if (!isServer && hasToken()) {
      try {
        isLiked = await getArticleLikeStatus(id);
      } catch (error) {
        console.warn("좋아요 상태 확인 실패:", error);
      }
    }

    // 좋아요 상태를 포함한 데이터
    const enrichedData = {
      ...data,
      isLiked,
    };

    // 캐시에 저장
    cache.set(cacheKey, {
      data: enrichedData,
      timestamp: Date.now(),
    });

    return enrichedData;
  } catch (error) {
    console.error(`게시글 ID ${id} 조회 중 오류 발생:`, error);
    throw error;
  }
}

/**
 * 게시글 생성 API
 */
export async function createArticle(articleData) {
  try {
    const response = await fetch(`${API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error(`게시글 생성 실패: ${response.status}`);
    }

    const data = await response.json();

    // 캐시 초기화
    clearArticleCache();

    return data;
  } catch (error) {
    console.error("게시글 생성 중 오류 발생:", error);
    throw error;
  }
}

/**
 * 게시글 수정 API
 */
export async function updateArticle(id, articleData) {
  try {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error(`게시글 수정 실패: ${response.status}`);
    }

    const data = await response.json();

    // 관련 캐시 초기화
    clearArticleCache(id);

    return data;
  } catch (error) {
    console.error(`게시글 ID ${id} 수정 중 오류 발생:`, error);
    throw error;
  }
}

/**
 * 게시글 삭제 API
 */
export async function deleteArticle(id) {
  try {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`게시글 삭제 실패: ${response.status}`);
    }

    const data = await response.json();

    // 관련 캐시 초기화
    clearArticleCache(id);

    return data;
  } catch (error) {
    console.error(`게시글 ID ${id} 삭제 중 오류 발생:`, error);
    throw error;
  }
}

/**
 * 댓글 생성 API
 */
export async function createComment({ articleId, content }) {
  try {
    if (!articleId || !content) {
      throw new Error("게시글 ID와 댓글 내용이 필요합니다.");
    }

    // 서버에서 실행 중인지 확인
    const isServer = typeof window === "undefined";
    if (isServer) {
      throw new Error("클라이언트에서만 실행 가능합니다.");
    }

    // 토큰 확인
    if (!hasToken()) {
      throw new Error("로그인이 필요합니다.");
    }

    const url = `${API_URL}/articles/${articleId}/comments`;
    console.log("댓글 생성 URL:", url);
    console.log("댓글 내용:", content);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ content }),
    });

    console.log("댓글 생성 응답 상태:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`댓글 생성 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("생성된 댓글 데이터:", data);

    // 기본 작성자 정보 추가 (API에서 작성자 정보가 누락되는 경우를 대비)
    if (!data.author) {
      try {
        // 로컬 스토리지에서 사용자 정보 가져오기 시도
        const userInfoStr = localStorage.getItem("userInfo");
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          data.author = {
            id: userInfo.id || 0,
            nickname: userInfo.nickname || "사용자",
          };
        } else {
          data.author = { id: 0, nickname: "사용자" };
        }
      } catch (err) {
        console.warn("사용자 정보 처리 중 오류:", err);
        data.author = { id: 0, nickname: "사용자" };
      }
    }

    // createdAt이 없는 경우 현재 시간 추가
    if (!data.createdAt) {
      data.createdAt = new Date().toISOString();
    }

    // 관련 게시글 캐시 초기화
    clearArticleCache(articleId);

    return data;
  } catch (error) {
    console.error("댓글 생성 중 오류 발생:", error);
    throw error;
  }
}

/**
 * 댓글 수정 API
 */
export async function updateComment(articleId, commentId, commentData) {
  try {
    if (!commentId || !commentData.content) {
      throw new Error("댓글 ID와 내용이 필요합니다.");
    }

    // 서버에서 실행 중인지 확인
    const isServer = typeof window === "undefined";
    if (isServer) {
      throw new Error("클라이언트에서만 실행 가능합니다.");
    }

    // 토큰 확인
    if (!hasToken()) {
      throw new Error("로그인이 필요합니다.");
    }

    const url = `${API_URL}/comments/${commentId}`;
    console.log("댓글 수정 URL:", url);
    console.log("수정할 댓글 내용:", commentData);

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(commentData),
    });

    console.log("댓글 수정 응답 상태:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("로그인이 필요합니다.");
      } else if (response.status === 403) {
        throw new Error("댓글을 수정할 권한이 없습니다.");
      }
      throw new Error(`댓글 수정 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("수정된 댓글 데이터:", data);

    // 기본 작성자 정보 보존 (API에서 작성자 정보가 누락되는 경우를 대비)
    if (!data.author) {
      data.author = { id: 0, nickname: "사용자" };
    }

    // 관련 게시글 캐시 초기화
    clearArticleCache(articleId);

    return data;
  } catch (error) {
    console.error(`댓글 ID ${commentId} 수정 중 오류 발생:`, error);
    throw error;
  }
}

/**
 * 댓글 삭제 API
 */
export async function deleteComment(articleId, commentId) {
  try {
    if (!commentId) {
      throw new Error("댓글 ID가 필요합니다.");
    }

    // 서버에서 실행 중인지 확인
    const isServer = typeof window === "undefined";
    if (isServer) {
      throw new Error("클라이언트에서만 실행 가능합니다.");
    }

    // 토큰 확인
    if (!hasToken()) {
      throw new Error("로그인이 필요합니다.");
    }

    const url = `${API_URL}/comments/${commentId}`;
    console.log("댓글 삭제 URL:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log("댓글 삭제 응답 상태:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("로그인이 필요합니다.");
      } else if (response.status === 403) {
        throw new Error("댓글을 삭제할 권한이 없습니다.");
      }
      throw new Error(`댓글 삭제 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("삭제된 댓글 응답:", data);

    // 관련 게시글 캐시 초기화
    clearArticleCache(articleId);

    return data;
  } catch (error) {
    console.error(`댓글 ID ${commentId} 삭제 중 오류 발생:`, error);
    throw error;
  }
}

/**
 * 게시글의 댓글 목록 조회 API
 */
export async function getCommentsByArticleId(articleId, skipCache = false) {
  try {
    if (!articleId) {
      console.error("댓글 목록 조회: 게시글 ID가 제공되지 않았습니다.");
      return [];
    }

    // 캐시 키 생성
    const cacheKey = `comments_${articleId}`;

    // 캐시 확인 (skipCache가 false일 때만)
    if (!skipCache && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      // 캐시가 유효한지 확인
      if (Date.now() - cachedData.timestamp < CACHE_TIME) {
        console.log(`캐시에서 댓글 목록 가져옴: ${cacheKey}`);
        return cachedData.data;
      } else {
        // 캐시가 만료되었으면 삭제
        console.log(`캐시 만료됨: ${cacheKey}`);
        cache.delete(cacheKey);
      }
    }

    // API 요청
    console.log(`게시글 ID ${articleId}의 댓글 목록 조회 API 호출`);
    const url = `${API_URL}/articles/${articleId}/comments`;
    console.log("댓글 목록 조회 URL:", url);

    // 서버에서 실행 중인지 확인 (localStorage 접근 방지)
    const isServer = typeof window === "undefined";
    const headers = {
      "Content-Type": "application/json",
    };

    if (!isServer && hasToken()) {
      headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    console.log("댓글 API 응답 상태:", response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.warn("댓글 조회 인증 오류:", response.status);
        return [];
      }
      if (response.status === 404) {
        console.warn("댓글을 찾을 수 없습니다:", response.status);
        return [];
      }
      console.error(`댓글 목록 조회 실패: ${response.status}`);
      return [];
    }

    const responseData = await response.json();
    console.log("댓글 API 응답 데이터:", responseData);

    // 응답 데이터 형식에 따라 댓글 배열 추출
    let comments = Array.isArray(responseData) ? responseData : [];

    // 댓글 데이터 안전하게 처리
    comments = comments.map((comment) => {
      // 작성자 정보가 없으면 기본 값 설정
      if (!comment.author) {
        comment.author = { id: 0, nickname: "알 수 없는 사용자" };
      }

      // createdAt이 없으면 현재 시간으로 설정
      if (!comment.createdAt) {
        comment.createdAt = new Date().toISOString();
      }

      // id가 없으면 임의의 ID 생성
      if (!comment.id) {
        comment.id = `temp_${Math.random().toString(36).substring(2, 15)}`;
      }

      return comment;
    });

    // 캐시 저장
    cache.set(cacheKey, {
      data: comments,
      timestamp: Date.now(),
    });

    return comments;
  } catch (error) {
    console.error(
      `게시글 ID ${articleId}의 댓글 목록 조회 중 오류 발생:`,
      error
    );
    return [];
  }
}

/**
 * 게시글 좋아요 증가 API
 */
export async function incrementArticleLike(articleId) {
  try {
    if (!articleId) {
      console.error("좋아요 증가: 게시글 ID가 제공되지 않았습니다.");
      throw new Error("게시글 ID가 필요합니다");
    }

    // 서버에서 실행 중인지 확인
    const isServer = typeof window === "undefined";
    if (isServer) {
      throw new Error("클라이언트에서만 실행 가능합니다.");
    }

    // 토큰 확인
    if (!hasToken()) {
      throw new Error("로그인이 필요합니다.");
    }

    // API 요청
    const url = `${API_URL}/articles/${articleId}/like`;
    console.log("좋아요 URL:", url);

    // 먼저 POST 메서드로 시도
    let method = "POST";
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log("좋아요 API 응답 상태:", response.status, response.statusText);

    // 400 오류(이미 좋아요를 누른 상태)이면 DELETE 메서드로 재시도
    if (response.status === 400) {
      console.log("이미 좋아요를 누른 상태입니다. 좋아요를 취소합니다.");
      method = "DELETE";
      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(
        "좋아요 취소 API 응답 상태:",
        response.status,
        response.statusText
      );
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("로그인이 필요합니다.");
      }
      throw new Error(`좋아요 처리 중 오류가 발생했습니다: ${response.status}`);
    }

    const data = await response.json();
    console.log("좋아요 API 응답 데이터:", data);

    // 관련 캐시 초기화
    clearArticleCache(articleId);
    clearArticleCache();

    // isLiked 값을 포함하여 반환
    return {
      ...data,
      isLiked: method === "POST", // POST면 좋아요 추가, DELETE면 좋아요 취소
    };
  } catch (error) {
    console.error(`게시글 ID ${articleId}의 좋아요 처리 중 오류 발생:`, error);
    throw error;
  }
}

/**
 * 게시글 좋아요 상태 확인 API
 */
export async function getArticleLikeStatus(articleId) {
  try {
    if (!articleId) {
      console.error("좋아요 상태 확인: 게시글 ID가 제공되지 않았습니다.");
      return false;
    }

    // 서버에서 실행 중인지 확인
    const isServer = typeof window === "undefined";
    if (isServer) {
      console.log("서버에서 실행 중이므로 좋아요 상태 확인 건너뜀");
      return false;
    }

    // 토큰 확인
    if (!hasToken()) {
      console.log("토큰이 없으므로 좋아요 상태 확인 건너뜀");
      return false;
    }

    // 먼저 캐시에서 게시글 정보 확인
    const articleCacheKey = `article_${articleId}`;
    if (cache.has(articleCacheKey)) {
      const cachedData = cache.get(articleCacheKey);
      if (
        Date.now() - cachedData.timestamp < CACHE_TIME &&
        cachedData.data?.isLiked !== undefined
      ) {
        console.log(
          `캐시에서 좋아요 상태 가져옴: ${articleId}, 상태: ${cachedData.data.isLiked}`
        );
        return cachedData.data.isLiked;
      }
    }

    const url = `${API_URL}/articles/${articleId}/like/status`;
    console.log("좋아요 상태 확인 URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log(
      "좋아요 상태 확인 응답 상태:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      console.warn(`좋아요 상태 확인 실패: ${response.status}`);

      // 무한 재귀를 방지하기 위해 getArticleById 호출 제거
      // 대신 API가 없는 경우 기본값으로 false 반환
      return false;
    }

    const data = await response.json();
    console.log("좋아요 상태 확인 응답 데이터:", data);

    // 캐시 업데이트
    if (cache.has(articleCacheKey)) {
      const cachedData = cache.get(articleCacheKey);
      if (cachedData.data) {
        cachedData.data.isLiked = data.isLiked || false;
        cache.set(articleCacheKey, {
          data: cachedData.data,
          timestamp: cachedData.timestamp,
        });
        console.log(
          `캐시 업데이트: ${articleId}의 isLiked를 ${data.isLiked}로 설정`
        );
      }
    }

    return data.isLiked || false;
  } catch (error) {
    console.error(
      `게시글 ID ${articleId}의 좋아요 상태 확인 중 오류 발생:`,
      error
    );
    return false;
  }
}
