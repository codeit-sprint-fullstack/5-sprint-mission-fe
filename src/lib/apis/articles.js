// queryFn 함수 정의

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Best Articles 목록 조회
export async function getBestArticleList({ limit = 3 }) {
  const { data } = await axios.get(`${API_URL}/articles/`, {
    params: {
      limit,
      sort: "likeCount",
    },
  });
  return data;
}

// Articles 목록 조회
export async function getArticleList({
  offset = 0,
  limit = 5,
  sort = "recent",
  keyword = "",
} = {}) {
  const { data } = await axios.get(`${API_URL}/articles/`, {
    params: {
      offset,
      limit,
      sort,
      keyword,
    },
  });
  return data;
}

// Article 상세 조회
export async function getArticle({ articleId }) {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}`);
  return data;
}

// todo: Article 작성

// todo: Article 수정

// todo: Article 삭제

// Article Comments 조회
export async function getArticleComments({ articleId }) {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}/comments`);
  return data;
}

// Article Comment 작성
export async function createComment({
  articleId,
  username = "똑똑한 판다",
  content,
}) {
  const { data } = await axios.post(
    `${API_URL}/articles/${articleId}/comments`,
    {
      username,
      content,
    }
  );
  return data;
}

// Article Comment 수정
export async function updateComment({ commentId, content }) {
  await axios.patch(`${API_URL}/articles/comments/${commentId}`, { content });
}

// Article Comment 삭제
export async function deleteComment({ commentId }) {
  await axios.delete(`${API_URL}/articles/comments/${commentId}`);
}
