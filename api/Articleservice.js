export const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

const url = {
  origin: "https://sprint-mission-api.vercel.app/",
  pathName: "articles/",
};

const messages = {
  error: {
    getArticleList: "게시글 목록을 불러오는데 실패했습니다.",
    getArticle: "게시글을 불러오는데 실패했습니다.",
    createArticle: "게시글을 생성하는데 실패했습니다.",
    patchArticle: "게시글을 수정하는데 실패했습니다.",
    deleteArticle: "게시글을 삭제하는데 실패했습니다.",
  },
  success: {
    deleteProduct: "게시글을 삭제하였습니다.",
  },
};

function throwHttpError(res) {
  if (res.status >= 200 && res.status < 300) {
    return;
  } else if (res.status >= 400 && res.status < 500) {
    const error = new Error("클라이언트 오류");
    error.status = res.status;
    throw error;
  } else if (res.status >= 500) {
    const error = new Error("서버 오류");
    error.status = res.status;
    throw error;
  } else {
    const error = new Error("알 수 없는 상태 코드");
    error.status = res.status;
    throw error;
  }
}

function getErrorMessage(e, message) {
  const errorMessage = {
    message,
    "상태 코드": e.status ?? "알 수 없는 상태 코드",
  };
  return errorMessage;
}

async function getArticleList({ page = 1, pageSize = 100, keyword = "" } = {}) {
  const requestUrl = new URL(`${url.origin}${url.pathName}`);
  const searchParams = { page, pageSize, keyword };
  for (const [key, value] of Object.entries(searchParams)) {
    requestUrl.searchParams.append(key, value);
  }
  return fetch(requestUrl)
    .then((res) => {
      throwHttpError(res);
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      const errorMessage = getErrorMessage(e, messages.error.getArticleList);
      return errorMessage;
    });
}

async function getArticle(id) {
  return fetch(`${url.origin}${url.pathName}${id}`)
    .then((res) => {
      throwHttpError(res);
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      const errorMessage = getErrorMessage(e, messages.error.getArticle);
      return errorMessage;
    });
}

async function createArticle({ title, content, image }) {
  return fetch(`${url.origin}${url.pathName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      throwHttpError(res);
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      const errorMessage = getErrorMessage(e, messages.error.createArticle);
      return errorMessage;
    });
}

async function patchArticle(id, { title, content, image }) {
  return fetch(`${url.origin}${url.pathName}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      throwHttpError(res);
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      const errorMessage = getErrorMessage(e, messages.error.patchArticle);
      return errorMessage;
    });
}

async function deleteArticle(id) {
  return fetch(`${url.origin}${url.pathName}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      throwHttpError(res);
      return messages.success.deleteProduct;
    })
    .catch((e) => {
      const errorMessage = getErrorMessage(e, messages.error.deleteArticle);
      return errorMessage;
    });
}
