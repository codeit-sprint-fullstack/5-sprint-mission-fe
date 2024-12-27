

const host = `https://sprint-mission-api.vercel.app`;

//[1]
//getArticleList() : GET 메서드를 사용해 주세요.
//  page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
// const getArticleList = async ({ page = 1, pageSize = 100, keyword = '' }) => {
//   const url = host + `/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// }
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
// const articleList = await getArticleList({page: 1, pageSize: 100, keyword: "string"});
const articleList = await getArticleList({});
console.log(articleList);
// console.log(getArticleList());



//[2]
//getArticle() : GET 메서드를 사용해 주세요.
// const getArticle = async (id) => {
//   const url = host + `/articles/${id}`;
//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// }
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
const article = await getArticle(354);
console.log(`article :::: ` + `${article.id}, ${article.title}, ${article.content}, ${article.image}, ${article.likeCount}`);

//[3]
//createArticle() : POST 메서드를 사용해 주세요.
//  request body에 title, content, image 를 포함해 주세요.
// const createArticle = async ({ title, content, image }) => {
//   const url = host + `/articles`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       title,
//       content,
//       image
//     })
//   });
//   const data = await response.json();

//   return data;
// }
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
const createData = await createArticle({ title: "seha title", content: "content", image: "image url" });
console.log(createData);

//[4]
//patchArticle() : PATCH 메서드를 사용해 주세요.
// const patchArticle = async (id, { title, content, image }) => {
//   const url = host + `/articles/${id}`;
//   const response = await fetch(url, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title,
//       content,
//       image
//     })
//   });
//   const data = await response.json();
//   return data;
// }
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
console.log(await patchArticle(createData.id, { title: "seha update title", content: "udpate content", image: " update image url" }));

//[5]
//deleteArticle() : DELETE 메서드를 사용해 주세요.
// const deleteArticle = async (id) => {
//   const url = host + `/articles/${id}`;
//   const response = await fetch(url, {
//     method: "DELETE",
//   });
//   console.log(response);
// }
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
deleteArticle(createData.id)