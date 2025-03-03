import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 게시글 조회
export async function getArticleDetail({ articleId }) {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}`);
  return data.data;
}

// 게시글 작성
export async function createArticle({
  username = "총명한 판다",
  title,
  content,
  images = [],
}) {
  const { data } = await axios.post(`${API_URL}/articles`, {
    username,
    title,
    content,
    images,
  });
  return data.data.id;
}

// 게시글 수정
export async function updateArticle(
  articleId, // articleId는 필수 파라미터
  { username, title, content, image = [] } = {}
) {
  const updateData = {
    ...(username && { username }),
    ...(title && { title }),
    ...(content && { content }),
    ...(image.length > 0 && { image }),
  };

  await axios.patch(`${API_URL}/articles/${articleId}`, updateData);
}

// 게시글 삭제
export async function deleteArticle(articleId) {
  await axios.delete(`${API_URL}/articles/${articleId}`);
}
