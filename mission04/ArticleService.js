import axios from "axios";
const url = new URL("https://sprint-mission-api.vercel.app/articles");
const headers = { "Content-Type": "application/json" };
// const instance = axios.create({
//   baseURL: "https://sprint-mission-api.vercel.app/articles",
//   headers: { "Content-Type": "application/json" },
// }); 이건 왜 오류나지?

export const getArticleList = async (page, pageSize, keyword) => {
  await axios
    .get(`${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`, {
      headers,
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error("error getArticleList : " + error));
};

export const getArticle = async (id) => {
  await axios
    .get(`${url}/${id}`, { headers })
    .then((response) => console.log(response.data))
    .catch((error) => console.error("error getArticle : " + error));
};

export const createArticle = async (title, content, img) => {
  console.log(title);
  await axios
    .post(url, {
      headers,
      title,
      content,
      img,
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error("error createArticle : " + error));
};

export const patchArticle = async (id, title, content, img) => {
  await axios
    .patch(`${url}/${id}`, {
      headers,
      title,
      content,
      img,
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error("error patchArticle :", error));
};

export const deleteArticle = async (id) => {
  await axios
    .delete(`${url}/${id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.error("error deleteArticle :", error));
};

export const article = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
