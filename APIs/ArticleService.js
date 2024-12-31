const BASE_URL = "https://sprint-mission-api.vercel.app";
const DEFAULT_HEADERS = {
   'Content-Type': 'application/json'
};

// GET 요청
async function fetchGet(endpoint, params={}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${BASE_URL}${endpoint}?${queryString}` : `${BASE_URL}${endpoint}`;
        // console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: DEFAULT_HEADERS,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
}

// POST 요청
async function fetchPost(endpoint, data = {}) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}

// PATCH 요청
async function fetchPatch(endpoint, data = {}) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
}

// DELETE 요청
async function fetchDelete(endpoint) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: DEFAULT_HEADERS,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
}

// 게시글 목록 조회
async function getArticles(page, pageSize, keyword) {
    try {
        const articleList = await fetchGet("/articles", {
            page,
            pageSize,
            keyword,
        });

        return articleList;
    } catch (error) {
        // console.error(error);
        throw error;
    }
}

// 게시글 조회
async function getArticle(id) {
    try {
        const article = await fetchGet(`/articles/${id}`);
        return article;
    } catch (error) {
        // console.error(error);
        throw error;
    }
}

// 게시글 등록
async function createArticle(title, content, image) {
    try {
        const data = {
            title,
            content,
            image,
        }
        const article = await fetchPost("/articles", data);
        return article;
    } catch (error) {
        throw error;
    }
}

// 게시글 수정
async function updateArticle(id, title, content, image) {
    try {
        const data = {
            title,
            content,
            image,
        }
        const article = await fetchPatch(`/articles/${id}`, data);
        return article;
    } catch (error) {
        throw error;
    }
}

// 게시글 삭제
async function deleteArticle(id) {
    try {
        const statusCode = await fetchDelete(`/articles/${id}`);
        return statusCode;
    } catch (error) {
        throw error;
    }
}

(async function() {
    try {
        // 게시글 목록
        // console.log("게시글 목록 조회");
        // const articleList = await getArticles(1, 10, "테스트");
        // console.log(articleList);

        // 게시글 상세
        // console.log("게시글 상세 조회");
        // const article = await getArticle(662);
        // console.log(article);
        
        // 게시글 등록
        // console.log("게시글 등록");
        // const newArticle = await createArticle("title", "content", "image");
        // console.log(newArticle);

        // 게시글 수정
        // console.log("게시글 수정");
        // const updatedArticle = await updateArticle(662, "title1", "content2", "image3");
        // console.log(updatedArticle);

        // 게시글 삭제
        console.log("게시글 삭제");
        const status = await deleteArticle(664);
        console.log(status);
 
    } catch (error) {
        console.error(error);
    }
})();
