import { api } from "./setAxiosDefault.js";

class Service {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }

  async request(method, url, data) {
    try {
      const response = await api[method](url, data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getResourceList = (params) => this.request("get", this.endPoint, { params });
  getResource = (id) => this.request("get", `${this.endPoint}/${id}`);
  createResource = (data) => this.request("post", this.endPoint, data);
  updateResource = (id, data) =>
    this.request("patch", `${this.endPoint}/${id}`, data);
  deleteResource = (id) => this.request("delete", `${this.endPoint}/${id}`);
}

export default Service;
