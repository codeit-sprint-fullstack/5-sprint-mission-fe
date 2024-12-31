import { apiService } from "./ApiService.js";

// 상품 API
export const productAPI = {
    // 상품 목록 조회
    async getProductList(params) {
        try {
            const response = await apiService.get('/produc1ts', params);
            return response.data;
        } catch (e) {
            if (e.response) {
                console.error('Status:', e.response.status);
                console.error('Failed to fetch product list:', e.response.data);
            } else {
                console.error('Error:', e.message);
            }
        }
    },

    // 상품 상세 조회
    async getProduct(productId) {
        try {
            const response = await apiService.get(`/products/${productId}`);
            return response.data;
        } catch (e) {
            if (e.response) {
                console.error('Status:', e.response.status);
                console.error('Failed to fetch product:', e.response.data);
            } else {
                console.error('Error:', e.message);
            }
        }
    },

    // 상품 등록
    async createProduct(data) {
        try {
            const response = await apiService.post('/products', data);
            return response.data;
        } catch (e) {
            if (e.response) {
                console.error('Status:', e.response.status);
                console.error('Failed to create product:', e.response.data);
            } else {
                console.error('Error:', e.message);
            }
        }
    },

    // 상품 수정
    async patchProduct(productId, data) {
        try {
            const response = await apiService.patch(`/products/${productId}`, data);
            return response.data;
        } catch (e) {
            if (e.response) {
                console.error('Status:', e.response.status);
                console.error('Failed to update product:', e.response.data);
            } else {
                console.error('Error:', e.message);
            }
        }
    },

    // 상품 삭제
    async deleteProduct(productId) {
        try {
            const response = await apiService.delete(`/products/${productId}`);
            return response.data;
        } catch (e) {
            if (e.response) {
                console.error('Status:', e.response.status);
                console.error('Failed to delete product:', e.response.data);
            } else {
                console.error('Error:', e.message);
            }
        }
    }
}