import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};

export const fetchArticleComments = async (articleId) => {
  const response = await axios.get(`${API_URL}/articles/${articleId}/comments`);
  return response.data;
};

export const createArticle = async ({ title, content, username, image }) => {
  const response = await axios.post(`${API_URL}/articles`, {
    title,
    content,
    username,
    image,
  });
  return response.data;
};

export const createComment = async ({ articleId, content, username }) => {
  const response = await axios.post(
    `${API_URL}/articles/${articleId}/comments`,
    {
      content,
      username,
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
