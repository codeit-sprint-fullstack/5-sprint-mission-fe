export const articleUrl = new URL("https://sprint-mission-api.vercel.app/articles");

//게시글 목록 조회
export const getArticleList = async ({page, pageSize, keyword}) => {
    try {
        articleUrl.searchParams.append("page", page);
        articleUrl.searchParams.append("pageSize", pageSize);
        articleUrl.searchParams.append("keyword", keyword);

        const response = fetch(articleUrl)
        .then((response) => response.json())
        .then((data) => data);
        return response;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//게시글 상세 조회
export const getArticle = async (id) => {
    try {
        const response = fetch((articleUrl + `/${id}`))
        .then((response) => response.json())
        .then((data) => data);
        return response;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//게시글 등록
export const createArticle = async ({title, content, image}) => {
    try {
        const response = fetch(articleUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                title,
                content,
                image
            })
        })
        .then((response) => response.json())
        .then((data) => data);
        return response;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//게시글 수정
export const patchArticle = async ({id, title, content, image}) => {
    try {
        const response = fetch((articleUrl + `/${id}`), {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                title,
                content,
                image
            })
        })
        .then((response) => response.json())
        .then((data) => data);
        return response;

    } catch (err) {
        console.log("Err: ", err);
    }
}

//게시글 삭제
export const deleteArticle = async (id) => {
    try {
        const response = fetch((articleUrl + `/${id}`), {
            method: "DELETE",
            headers: {"Content-Type": "application/json",}
        })

        return response;

    } catch (err) {
        console.log("Err: ", err);
    }
}