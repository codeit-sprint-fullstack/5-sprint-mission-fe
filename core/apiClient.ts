import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const codeitApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CODEIT_URL,
});

export const apiClientList = { apiClient, codeitApiClient };
