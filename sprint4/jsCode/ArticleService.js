import axios from "axios";

const API_BASE_URL = "https://sprint-mission-api.vercel.app/articles";

export const getArticleList = (page, pageSize, keyword) => {
    return axios
        .get(API_BASE_URL, {
            params: { page, pageSize, keyword }
        })
        .then(response => response.data)
        .catch(error => console.error("Error fetching articles:", error));
};


export const getArticle = (id) => {
    return axios 
        .get('${API_BASE_URL}/${id}')
        .then(response => response.data)
        .catch(error => console.error("Error fetching article:", error));
};


export const creatArticle = (title, content, image) => {
    return axios
        .post(API_BASE_URL, {title, content, image})
        .then(response => response.data)
        .catch(error => console.error("Error creating article:", error));
};

export const patchArticle = (id, updateData) => {
    return axios
        .patch(`${API_BASE_URL}/${id}`, updateData)
        .then(response => response.data)
        .catch(error => console.error("Error updating article:", error));
};

export const deleteArticle = (id) => {
    return axios
        .delete(`${API_BASE_URL}/${id}`)
        .then(response => response.data)
        .catch(error => console.error("Error deleting article:", error));
};