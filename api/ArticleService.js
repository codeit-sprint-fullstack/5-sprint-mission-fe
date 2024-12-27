const host = `https://sprint-mission-api.vercel.app`;

const getArticleList = async ({ page = 1, pageSize = 100, keyword = '' }) => {
  const url = host + `/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return response.json();
    })
    .catch(error => {
      console.log(`Fetch error: ${error.message}`)
      return []; // 에러 발생 시 빈 배열 반환
    });
}

const getArticle = async (id) => {
  const url = host + `/articles/${id}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return response.json();
    })
    .catch(error => {
      console.log(`Fetch error: ${error.message}`)
      return null;
    })
}

const createArticle = async ({ title, content, image }) => {
  const url = host + `/articles`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content,
      image
    })
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return response.json();
    })
    .catch(error => {
      console.log(`Fetch error: ${error.message}`)
      return null;
    });
}

const patchArticle = async (id, { title, content, image }) => {
  const url = host + `/articles/${id}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content,
      image
    })
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return response.json();
    })
    .catch(error => {
      console.log(`Fetch error: ${error.message}`)
      return null;
    });
}

const deleteArticle = async (id) => {
  const url = host + `/articles/${id}`;
  fetch(url, {
    method: "DELETE"
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      console.log(response);
    })
    .catch(error => {
      console.log(`Fetch error: ${error.message}`)
    });
}


export const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
}