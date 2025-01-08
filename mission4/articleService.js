const BASE_URL = "https://sprint-mission-api.vercel.app/articles";

/** 게시글 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지(기본값 : 1)
 * @param {int} params.pageSize - 페이지 사이즈(기본값 : 100)
 * @param {string} params.keyword - 검색 키워드
 */
const getArticleList = (params) => {
  const getArticleUrl = new URL(BASE_URL);

  for (const [key, value] of Object.entries(params)) {
    getArticleUrl.searchParams.append(key, value);
  }

  fetch(getArticleUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

/** 게시글 상세 조회
 * @param {int} id - 게시글 ID
 */
const getArticle = (id) => {
  fetch(BASE_URL + `/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} 게시글을 찾을 수 없습니다.`);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

/** 게시글 등록
 * @param {Object} params - 게시글 정보
 * @param {string} params.title - 제목
 * @param {string} params.content - 본문
 * @param {string} params.image - 이미지 링크
 */
const createArticle = (params) => {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: params.title,
      content: params.content,
      image: params.image,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

/** 게시글 수정
 * @param {int} id - 게시글 ID
 * @param {Object} params - 게시글 정보
 * @param {string} params.title - 제목
 * @param {string} params.content - 본문
 * @param {string} params.image - 이미지 링크
 */
const patchArticle = (id, params) => {
  fetch(BASE_URL + `/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: params.title,
      content: params.content,
      image: params.image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} 수정할 게시글을 찾을 수 없습니다.`);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

/** 게시글 삭제
 * @param {int} id - 게시글 ID
 * @returns 게시글 삭제 성공 시 성공 메시지 콘솔에 출력
 */
const deleteArticle = (id) => {
  fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response && response.status === 404) {
        throw new Error(`${response.status} 삭제할 게시글을 찾을 수 없습니다.`);
      }
      console.log("게시글을 삭제했습니다.");
    })
    .catch((err) => console.log(err));
};

export {
  BASE_URL,
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
