import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const GetProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}) => {
  const url = `${baseUrl}/products`;

  try {
    const response = await axios.get(url, {
      params: { page, pageSize, orderBy, keyword },
    });

    return response.data;
  } catch (err) {
    console.log("api error in GetProducts :: " + err.message);
    throw new Error();
  }
};

export default GetProducts;
