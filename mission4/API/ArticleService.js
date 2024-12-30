const BASE_URL = "https://sprint-mission-api.vercel.app/articles"

// GET: Article 리스트 가져오기
export const getArticleList = (page = 1, pageSize = 10, keyword = "") => {
  return fetch(`${BASE_URL}?${page}$pazeSize=${pageSize}&${keyword}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`실패: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => console.error(error.message));
};

// GET: 특정 Article 가져오기
export const getArticle = (id) => {
  return fetch(`${BASE_URL}/${id}`)
  .then((response) => {
    if(!response.ok) {
      throw new Error(`실패: ${response.status}`)
    }
    return response.json();
  })
  .catch((error) => console.error(error.message));
};

// POST: 새로운 Article 생성
export const createArticle = (title, content, image) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({ title, content, image}),
  })
  .then((response) => {
    if(!response.ok) {
      throw new Error(`실패: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => console.error(error.message));
};

// PATCH: Article 수정
export const patchArticle = (id, updatedFields) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(updatedFields),
  })
  .then((response) => {
    if(!response.ok) {
      throw new Error(`실패: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => console.error(error.message));
};

// DELETE: Article 삭제
export const deleteArticle = (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
  .then((response) => {
    if(!response.ok) {
      throw new Error(`에러: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => console.error(error.message));
};