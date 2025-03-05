import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  // baseURL: `http://${process.env.NEXT_PUBLIC_DATABASE_HOST}:${process.env.NEXT_PUBLIC_DATABASE_PORT}`,
});

export default instance;
