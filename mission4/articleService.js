const articleUrl = "https://sprint-mission-api.vercel.app/articles";

/** 게시글 목록 조회
 * @param params 객체 {page: integer(1), pageSize: integer(100), keyword: "string"}
 * @descrtipion page, pageSize, keyword -> query
 * @returns 게시글 객체 목록 배열 반환
 */
const getArticleList = (params) => {
    const getArticleUrl = new URL(articleUrl);

    for (const [key, value] of Object.entries(params)) {
        getArticleUrl.searchParams.append(key, value);
    }

    const response = fetch(getArticleUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log("error: ", err))
    
    return response;
}

/** 게시글 상세 조회
 * @param id 게시글 ID: integer
 * @description id -> path
 * @returns response 객체 {id, title, content, image, likeCount}
 */
const getArticle = (id) => {
    const response = fetch((articleUrl + `/${id}`))
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}: 상품을 찾을 수 없습니다.`);
        }
        return response.json()
    })
    .then((data) => data)
    .catch((err) => console.log("error: ", err))
        
    return response;
}

/** 게시글 등록
 * @param params 객체 {title: "string", content: "string", image: "string"}
 * @description title, content, image -> body
 * @returns 등록된 객체 {id, title, content, image, likeCount}
 */
const createArticle = (params) => {
    const response = fetch(articleUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            title: params.title,
            content: params.content,
            image: params.image
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}: 유효성 검사 오류`);
        }
        return response.json()
    })
    .then((data) => data)
    .catch((err) => console.log("error: ", err))
        
    return response;
}

/** 게시글 수정
 * @param params 객체 {id: integer, title: "string", content: "string", image: "string"}
 * @description id -> path / title, content, image -> body
 * @returns 수정된 객체 {id, title, content, image, likeCount}
 */
const patchArticle = (params) => {
    const response = fetch(articleUrl + `/${params.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            title: params.title,
            content: params.content,
            image: params.image
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}: 수정할 상품을 찾을 수 없습니다.`);
        }
        return response.json()
    })
    .then((data) => data)
    .catch((err) => console.log("error: ", err))

    return response;
}

/** 게시글 삭제
 * @param id 게시글 ID: integer
 * @description id -> path
 * @returns 상품 삭제 성공 시 성공 메시지 콘솔에 출력
 */
const deleteArticle = (id) => {
    fetch((articleUrl + `/${id}`), {
        method: "DELETE",
        headers: {"Content-Type": "application/json",}
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}: 삭제할 상품을 찾을 수 없습니다.`);
        }
        console.log("상품을 삭제했습니다.");
    })
    .catch((err) => console.log("error: ", err))
}

export { articleUrl, getArticleList, getArticle, createArticle, patchArticle, deleteArticle }