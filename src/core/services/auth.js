import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_ARL_PANDA_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginAPI = async (data) => {
  const response = await apiClient.post("/auth/signIn", data);
  return response.data;
};

export const signUpAPI = async (data) => {
  const response = await apiClient.post("/auth/signUp", data);
  return response.data;
};

export const refreshTokenAPI = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/auth/refresh-token`, {
    refreshToken,
  });
  return response.data;
};

export const getUserInfo = async (accessToken) => {
  const response = await apiClient.get("/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export default apiClient;
