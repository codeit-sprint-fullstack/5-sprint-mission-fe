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
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8초 타임아웃

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

      // 백엔드 응답 구조가 다른 경우를 위한 처리
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
          imageUrl: article.imageUrl || "https://via.placeholder.com/800x400",
          createdAt: article.createdAt || new Date().toISOString(),
          likes: article.likes || 0,
          author: {
            id: article.author?.id || String(Math.random()),
            nickname: article.author?.nickname || "익명",
          },
        })),
        pageInfo,
      };

      // 결과를 캐시에 저장
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      console.log(`게시글 목록 데이터를 캐시에 저장 (${queryParams})`);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        // 타임아웃 시 캐시된 데이터 반환 또는 기본값 반환
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
    const response = await fetch(`${API_BASE_URL}/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error("게시글 작성에 실패했습니다");
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 작성 중 오류가 발생했습니다:", error);
    throw error;
  }
}

export async function updateArticle(id, articleData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error("게시글 수정에 실패했습니다");
    }

    return await response.json();
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
    // POST 요청을 /api/articles/:id/like 엔드포인트로 보냅니다 (항상 +1 증가)
    console.log(`좋아요 증가 요청: ${API_BASE_URL}/api/articles/${id}/like`);
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 테스트용 사용자 ID 추가
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
    });

    // 응답 상태 확인을 위한 로깅 추가
    console.log(`API 응답 상태: ${response.status}`);

    // 응답 본문 미리 확인
    const responseClone = response.clone();
    const responseText = await responseClone.text();
    console.log("API 응답 본문:", responseText);

    if (!response.ok) {
      throw new Error(`좋아요 증가 실패 (상태 코드: ${response.status})`);
    }

    // 좋아요가 변경되었으므로 캐시 초기화 (목록 페이지에 즉시 반영)
    clearArticleCache(id);
    console.log(`게시글 ID ${id}의 좋아요 증가 후 캐시 초기화됨`);

    // 응답이 비어있지 않은 경우만 JSON 파싱
    let likeResponse;
    if (responseText.trim()) {
      try {
        likeResponse = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        throw new Error("API 응답을 처리할 수 없습니다");
      }
    } else {
      // 비어있는 응답인 경우 게시글 다시 조회
      console.log("API 응답이 비어있어 게시글 정보를 다시 조회합니다");
      // 캐시를 사용하지 않고 새로운 데이터를 가져오기 위해 캐시 초기화
      clearArticleCache(id);
      likeResponse = await getArticleById(id, true); // skipCache=true 전달
    }

    console.log("좋아요 증가 응답:", likeResponse);

    // 좋아요 응답이 불완전한 경우, 기존 게시글 정보를 가져와서 업데이트된 좋아요 정보만 적용
    if (!likeResponse || !likeResponse.author) {
      console.log(
        "좋아요 응답에 author 필드가 없어 게시글 정보를 다시 가져옵니다"
      );
      // 최신 데이터를 가져오기 위해 캐시 초기화
      clearArticleCache(id);
      const fullArticle = await getArticleById(id, true); // skipCache=true 전달

      // 좋아요 응답에서 필요한 필드(likes)만 업데이트
      return {
        ...fullArticle,
        likes: likeResponse?.likes || fullArticle.likes, // 응답이 없으면 가져온 게시글 데이터 사용
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

// 기존 함수를 새 함수명으로 매핑 (하위 호환성 유지)
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
    console.error("Error fetching comments:", error);
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
        // 테스트용 사용자 ID 추가 - 게시글 삭제에 사용된 것과 동일한 ID
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("댓글 작성에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
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
    console.log(
      `댓글 수정 API 호출: ${API_BASE_URL}/api/comments/${commentId}`,
      commentData
    );

    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 테스트용 사용자 ID 추가 - 게시글 삭제에 사용된 것과 동일한 ID
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
      body: JSON.stringify(commentData),
    });

    // 응답 복제하여 텍스트와 JSON으로 모두 처리할 수 있도록 함
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
      // 빈 응답이 아닌 경우에만 JSON 파싱 시도
      if (responseText.trim()) {
        return JSON.parse(responseText);
      } else {
        // 응답이 비어 있으면 기존 데이터를 그대로 반환
        return { ...commentData, id: commentId };
      }
    } catch (jsonError) {
      console.error("JSON 파싱 오류:", jsonError);
      // JSON 파싱 오류시 기본 데이터 반환
      return { ...commentData, id: commentId };
    }
  } catch (error) {
    console.error("Error updating comment:", error);
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
    console.log(
      `댓글 삭제 API 호출: ${API_BASE_URL}/api/comments/${commentId}`
    );

    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 테스트용 사용자 ID 추가 - 게시글 삭제에 사용된 것과 동일한 ID
        "X-User-Id": "2b1d9484-b7c9-4a45-84c1-9c9208df777a",
      },
    });

    // 응답 텍스트 확인
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
    console.error("Error deleting comment:", error);
    throw error;
  }
};
