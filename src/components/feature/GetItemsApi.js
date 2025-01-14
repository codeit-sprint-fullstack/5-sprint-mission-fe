import axios from "axios";

const URL = "https://panda-market-api.vercel.app/products";

const GetItemsApi = ({
  orderBy = "recent",
  page = "1",
  pageSize = "10",
  search = "",
}) => {
  const apiEndpoint =
    URL +
    `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${search}`;

  return axios
    .get(apiEndpoint)
    .then((response) => response.data.list || [])

    .catch((e) => {
      console.log("API error in GetItemsApi:", e);
      throw e;
    });
};

export default GetItemsApi;
