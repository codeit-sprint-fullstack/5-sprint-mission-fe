// GET Article List
const getArticleList = async (params) => {
  const res = fetch("https://sprint-mission-api.vercel.app/api/articles", {
    method: "GET",
  })
    .then((params) => {})
    .catch((error) => {
      error.message;
    });

  url.searchParams.append("page", params.page);
  url.searchParams.append("pageSize", params.pageSize);
  url.searchParams.append("keyword", params.keyword);

  const data = await res.json();
  console.log(data);
};

// GET Article/:id
const getArticle = async (params) => {
  const url = new URL(
    `https://sprint-mission-api.vercel.app/api/articles/${params.id}`
  );
  const res = fetch(url, {
    method: "GET",
  })
    .then((params) => {})
    .catch((error) => {});

  const data = await res.json();
  console.log(data);
};

// POST Article
const createArticle = async (params) => {
  const res = fetch("https://sprint-mission-api.vercel.app/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: params.title,
      content: params.content,
      image: image.content,
    }),
  })

  const data = await res.json();
  return data;
};

// PATCH Articles

const patchArticle = async (params) => {
  const url = new URL(
    `https://sprint-mission-api.vercel.app/api/articles/${params.id}`
  );
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
      title: params.title,
      content: params.content,
      image: image.content,
    }),
  });
  const data = await res.json();
  return data;
};

// DELETE Article

const deleteArticle = async (params) => {
  const url = new URL(
    `https://sprint-mission-api.vercel.app/api/articles/${params.id}`
  );
  const res = fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
    }),
  })
    .then((params) => {})
    .catch((error) => {});

  const data = await res.json();
  return data;
};

export default {
  getArticle,
  getArticleList,
  createArticle,
  patchArticle,
  deleteArticle
};

