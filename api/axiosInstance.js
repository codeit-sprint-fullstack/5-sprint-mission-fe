import axios from 'axios';

const axiosInstances = {};

const setInterceptorsRequest = (instance) => {
  instance.interceptors.request.use(
    config => {
      return config;
    }
  )
}

const setInterceptorsResponse = (instance) => {
  instance.interceptors.response.use(
    response => response,
    error => {
      console.error(`Error: ${error.response.status} - ${error.response.statusText} in "${error.config.baseURL}${error.config.url}"`);
      return Promise.reject(error);
    }
  )
}

export const getAxiosInstance = (url) => {
  if (!axiosInstances[url]) {
    const instance = axios.create({
      baseURL: url
    })

    setInterceptorsRequest(instance);
    setInterceptorsResponse(instance);

    axiosInstances[url] = instance;
  }
  
  return axiosInstances[url];
}
