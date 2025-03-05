const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const cache = new Map();
const CACHE_TIME = 5 * 60 * 1000; // 5분

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

  console.log(`캐시 초기화 완료: ${deletedCount}개 항목 삭제됨`);

  // 브라우저 환경에서는 캐시 초기화 타임스탬프를 로컬스토리지에 저장
  if (typeof window !== "undefined") {
    localStorage.setItem("cacheLastCleared", Date.now().toString());
  }
}

export async function getArticles({
  page = 1,
  limit = 5,
  search = "",
  sort = "latest",
  skipCache = false,
} = {}) {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
      sort,
    }).toString();

    const cacheKey = `articles_${queryParams}`;
    const cachedData = cache.get(cacheKey);

    if (
      !skipCache &&
      cachedData &&
      Date.now() - cachedData.timestamp < CACHE_TIME
    ) {
      console.log(`캐시에서 게시글 목록 데이터 반환 (${queryParams})`);
      return cachedData.data;
    }

    console.log(
      `서버에서 게시글 목록 데이터 요청 (${queryParams})${
        skipCache ? " 캐시 무시" : ""
      }`
    );
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/articles?${queryParams}`,
        {
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("게시글을 가져오는데 실패했습니다");
      }

      const data = await response.json();

      const articles = Array.isArray(data) ? data : data.articles || [];
      const pageInfo =
        !Array.isArray(data) && data.pageInfo
          ? data.pageInfo
          : {
              total: articles.length,
              totalPages: Math.ceil(articles.length / limit),
              currentPage: page,
              hasNext: page * limit < articles.length,
              hasPrev: page > 1,
            };

      const result = {
        articles: articles.map((article) => ({
          ...article,
          id: article.id || String(Math.random()),
          title: article.title || "",
          content: article.content || "",
          imageUrl: article.imageUrl || "/img_default.svg",
          createdAt: article.createdAt || new Date().toISOString(),
          likes: article.likes || 0,
          author: {
            id: article.author?.id || String(Math.random()),
            nickname: article.author?.nickname || "익명",
          },
        })),
        pageInfo,
      };

      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      console.log(`게시글 목록 데이터를 캐시에 저장 (${queryParams})`);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        return (
          cachedData?.data || {
            articles: [],
            pageInfo: {
              total: 0,
              totalPages: 1,
              currentPage: 1,
              hasNext: false,
              hasPrev: false,
            },
          }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("게시글 목록을 가져오는 중 오류가 발생했습니다:", error);
    return {
      articles: [],
      pageInfo: {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}

export async function getArticleById(id, skipCache = false) {
  try {
    // 캐시 키 생성
    const cacheKey = `article_${id}`;

    // skipCache가 false이고 캐시가 있다면 캐시된 데이터 반환
    const cachedData = cache.get(cacheKey);
    if (
      !skipCache &&
      cachedData &&
      Date.now() - cachedData.timestamp < CACHE_TIME
    ) {
      console.log(`캐시에서 게시글 (ID: ${id}) 데이터 반환`);
      return cachedData.data;
    }

    console.log(`서버에서 게시글 (ID: ${id}) 데이터 요청`);
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}`);

    if (!response.ok) {
      throw new Error("게시글을 가져오는데 실패했습니다");
    }

    const article = await response.json();

    // 결과를 캐시에 저장
    cache.set(cacheKey, {
      data: article,
      timestamp: Date.now(),
    });

    console.log(`게시글 (ID: ${id}) 데이터를 캐시에 저장`);
    return article;
  } catch (error) {
    console.error("게시글을 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
}

export async function createArticle(articleData) {
  try {
    console.log("게시글 생성 요청:", articleData);
    const response = await fetch(`${API_BASE_URL}/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 테스트용 사용자 ID 추가
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      // 응답 내용을 텍스트로 읽어봅니다
      const errorText = await response
        .text()
        .catch(() => "응답 텍스트 읽기 실패");
      console.error(`API 오류 응답: ${errorText}`);
      throw new Error(
        `게시글 작성에 실패했습니다 (상태 코드: ${response.status})`
      );
    }

    const newArticle = await response.json();
    console.log("생성된 게시글:", newArticle);

    // 목록 캐시 초기화
    clearArticleCache();

    return newArticle;
  } catch (error) {
    console.error("게시글 작성 중 오류가 발생했습니다:", error);
    throw error;
  }
}

export async function updateArticle(id, articleData) {
  try {
    console.log(`게시글 수정 요청: ID ${id}`, articleData);

    // 수정 전에 먼저 캐시를 초기화합니다
    clearArticleCache(id);

    const response = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 테스트용 사용자 ID 추가
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      // 응답 내용을 텍스트로 읽어봅니다
      const errorText = await response
        .text()
        .catch(() => "응답 텍스트 읽기 실패");
      console.error(`API 오류 응답: ${errorText}`);
      throw new Error(
        `게시글 수정에 실패했습니다 (상태 코드: ${response.status})`
      );
    }

    const updatedArticle = await response.json();
    console.log("업데이트된 게시글:", updatedArticle);

    // 수정 성공 시 캐시 초기화 (전체 캐시 초기화)
    clearArticleCache();

    // 브라우저 환경에서는 로컬스토리지에도 업데이트 표시
    if (typeof window !== "undefined") {
      localStorage.setItem("lastArticleUpdate", Date.now().toString());
      localStorage.setItem("lastUpdatedArticleId", id);
    }

    return updatedArticle;
  } catch (error) {
    console.error("게시글 수정 중 오류가 발생했습니다:", error);
    throw error;
  }
}

export async function deleteArticle(id) {
  try {
    console.log(`게시글 삭제 시도: ID ${id}`);
    console.log(`API URL: ${API_BASE_URL}/api/articles/${id}`);

    const response = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 테스트용 사용자 ID 추가
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
    });

    console.log(`삭제 요청 응답 상태: ${response.status}`);

    if (!response.ok) {
      // 응답 내용을 텍스트로 읽어봅니다
      const errorText = await response
        .text()
        .catch(() => "응답 텍스트 읽기 실패");
      console.error(`API 오류 응답: ${errorText}`);
      throw new Error(
        `게시글 삭제에 실패했습니다 (상태 코드: ${response.status})`
      );
    }

    // 삭제 성공 시 캐시 초기화
    clearArticleCache();

    console.log("게시글 삭제 성공");
    return true;
  } catch (error) {
    console.error("게시글 삭제 중 오류가 발생했습니다:", error);
    throw error;
  }
}

export async function incrementArticleLike(id) {
  try {
    console.log(`좋아요 증가 요청: ${API_BASE_URL}/api/articles/${id}/like`);
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
    });

    console.log(`API 응답 상태: ${response.status}`);

    const responseClone = response.clone();
    const responseText = await responseClone.text();
    console.log("API 응답 본문:", responseText);

    if (!response.ok) {
      throw new Error(`좋아요 증가 실패 (상태 코드: ${response.status})`);
    }

    // 좋아요가 변경되었으므로 캐시 초기화
    clearArticleCache(id);
    console.log(`게시글 ID ${id}의 좋아요 증가 후 캐시 초기화됨`);

    let likeResponse;
    if (responseText.trim()) {
      try {
        likeResponse = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        throw new Error("API 응답을 처리할 수 없습니다");
      }
    } else {
      console.log("API 응답이 비어있어 게시글 정보를 다시 조회합니다");
      clearArticleCache(id);
      likeResponse = await getArticleById(id, true);
    }

    console.log("좋아요 증가 응답:", likeResponse);

    if (!likeResponse || !likeResponse.author) {
      console.log(
        "좋아요 응답에 author 필드가 없어 게시글 정보를 다시 가져옵니다"
      );
      clearArticleCache(id);
      const fullArticle = await getArticleById(id, true);

      return {
        ...fullArticle,
        likes: likeResponse?.likes || fullArticle.likes,
      };
    }

    // 캐시가 확실히 삭제되었는지 한 번 더 확인
    setTimeout(() => {
      console.log("캐시 초기화 한 번 더 확인");
      clearArticleCache(id);
    }, 500);

    return likeResponse;
  } catch (error) {
    console.error("좋아요 증가 중 오류가 발생했습니다:", error);
    throw error;
  }
}

// 하위 호환성 유지 (기존 코드에서 참조하는 경우가 있을 수 있음)
export const toggleArticleLike = incrementArticleLike;

/**
 * 게시글의 댓글 목록을 가져옵니다.
 * @param {string} articleId - 게시글 ID
 * @returns {Promise<Array>} 댓글 목록
 */
export const getCommentsByArticleId = async (articleId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/comments/article/${articleId}`
    );
    if (!response.ok) {
      throw new Error("댓글 목록을 불러오는데 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 목록 조회 중 오류:", error);
    throw error;
  }
};

/**
 * 새 댓글을 생성합니다.
 * @param {Object} commentData - 댓글 데이터 (content, articleId)
 * @returns {Promise<Object>} 생성된 댓글
 */
export const createComment = async (commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("댓글 작성에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("댓글 생성 중 오류:", error);
    throw error;
  }
};

/**
 * 댓글을 수정합니다.
 * @param {string} commentId - 댓글 ID
 * @param {Object} commentData - 수정할 댓글 데이터 (content)
 * @returns {Promise<Object>} 수정된 댓글
 */
export const updateComment = async (commentId, commentData) => {
  try {
    console.log(`댓글 수정 요청: ${commentId}`, commentData);

    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
      body: JSON.stringify(commentData),
    });

    const responseClone = response.clone();
    const responseText = await responseClone.text();
    console.log("API 응답 텍스트:", responseText);

    if (!response.ok) {
      const errorMessage = responseText
        ? `댓글 수정 실패: ${responseText}`
        : "댓글 수정에 실패했습니다.";
      throw new Error(errorMessage);
    }

    try {
      if (responseText.trim()) {
        return JSON.parse(responseText);
      } else {
        return { ...commentData, id: commentId };
      }
    } catch (jsonError) {
      console.error("JSON 파싱 오류:", jsonError);
      return { ...commentData, id: commentId };
    }
  } catch (error) {
    console.error("댓글 수정 중 오류:", error);
    throw error;
  }
};

/**
 * 댓글을 삭제합니다.
 * @param {string} commentId - 댓글 ID
 * @returns {Promise<void>}
 */
export const deleteComment = async (commentId) => {
  try {
    console.log(`댓글 삭제 요청: ${commentId}`);

    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
    });

    const responseClone = response.clone();
    const responseText = await responseClone.text();
    console.log("API 응답 텍스트:", responseText);

    if (!response.ok) {
      const errorMessage = responseText
        ? `댓글 삭제 실패: ${responseText}`
        : "댓글 삭제에 실패했습니다.";
      throw new Error(errorMessage);
    }

    return;
  } catch (error) {
    console.error("댓글 삭제 중 오류:", error);
    throw error;
  }
};
