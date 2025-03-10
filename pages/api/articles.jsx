import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchArticles = async (params = {}) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    searchTerm = "",
  } = params;

  try {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        page,
        pageSize,
        orderBy,
        search: searchTerm,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
    return { list: [], totalCount: 0 };
  }
};

export const fetchArticleById = async (articleId) => {
  if (!articleId || articleId === "undefined") {
    console.error("Invalid articleId:", articleId);
    throw new Error("Invalid articleId");
  }

  try {
    const response = await axios.get(`${API_URL}/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error.response?.data || error);
    throw error;
  }
};

// 게시글 댓글 조회
export const fetchArticleComments = async (articleId, limit = 5) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles/${articleId}/comments`,
      { params: { limit } }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 불러오기 실패", error.response?.data || error);
    throw error;
  }
};

export const createArticle = async ({ title, content }) => {
  const response = await axios.post(`${API_URL}/articles`, {
    title,
    content,
  });
  return response.data;
};

//게시글 댓글 생성
export const createComment = async ({ articleId, content }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    return;
  }
  const response = await axios.post(
    `${API_URL}/articles/${articleId}/comments`,
    {
      content,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateArticle = async ({
  articleId,
  title,
  content,
  username,
}) => {
  const response = await axios.patch(`${API_URL}/articles/${articleId}`, {
    title,
    content,
    username,
  });
  return response.data;
};

export const updateComment = async ({ articleId, commentId, content }) => {
  const response = await axios.patch(
    `${API_URL}/articles/${articleId}/comments/${commentId}`,
    {
      content,
    }
  );
  return response.data;
};

export const deleteArticle = async ({ articleId }) => {
  const response = await axios.delete(`${API_URL}/articles/${articleId}`);
  return response.data;
};

export const deleteComment = async ({ articleId, commentId }) => {
  const response = await axios.delete(
    `${API_URL}/articles/${articleId}/comments/${commentId}`
  );
  return response.data;
};
