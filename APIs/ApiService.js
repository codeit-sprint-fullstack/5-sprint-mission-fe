import axios from 'axios';

// API 기본 설정
const apiClinet = axios.create({
    baseURL: 'https://sprint-mission-api.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
});

export const apiService = {
    // GET 요청
    async get(endpoint, params = {}) {
        try {
            const response = await apiClinet.get(endpoint, { params });
            return response;
        } catch (error) {
            // console.error('GET request failed:', error);
            throw error;
        }
    },

    // POST 요청
    async post(endpoint, data = {}) {
        try {
            const response = await apiClinet.post(endpoint, data);
            return response;
        } catch (error) {
            // console.error('POST request failed:', error);
            throw error;
        }
    },

    // PUT 요청
    async put(endpoint, data = {}) {
        try {
            const response = await apiClinet.put(endpoint, data);
            return response;
        } catch (error) {
            // console.error('PUT request failed:', error);
            throw error;
        }
    },

    // PATCH 요청
    async patch(endpoint, data = {}) {
        try {
            const response = await apiClinet.patch(endpoint, data);
            return response;
        } catch (error) {
            // console.error('PATCH request failed:', error);
            throw error;
        }
    },

    // DELETE 요청
    async delete(endpoint) {
        try {
            const response = await apiClinet.delete(endpoint);
            return response;
        } catch (error) {
            // console.error('DELETE request failed:', error);
            throw error;
        }
    },
};
