const getArticleList = async (page, pageSize, keyword = "") => {
  return fetch(
    `https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((res) => res.json())
    .catch((error) =>
      console.error("Error fetching article list:", error.message)
    );
};

getArticleList("1", "3").then((result) => {
  console.log(result);
});

const getArticle = async (id) => {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
    .then((res) => res.json())
    .catch((error) =>
      console.error("Error fetching article list:", error.message)
    );
};

getArticle(4).then((result) => {
  console.log(result);
});

const createArticle = async (title, content, image = "") => {
  const data = { title, content, image };
  return fetch(`https://sprint-mission-api.vercel.app/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) =>
      console.error("Error fetching article list:", error.message)
    );
};

createArticle("!!!!", "되나?").then((result) => {
  console.log(result);
});

const patchArticle = async (id) => {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Updated Title",
      content: "Updated content here.",
      image: "",
    }),
  })
    .then((res) => res.json())
    .catch((error) =>
      console.error("Error fetching article list:", error.message)
    );
};

patchArticle(1).then((result) => {
  console.log(result);
});

const deleteArticle = async (id) => {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) =>
      console.error("Error fetching article list:", error.message)
    );
};

deleteArticle(1).then((result) => {
  console.log(result);
});

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
