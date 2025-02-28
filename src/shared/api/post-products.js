import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const PostProducts = async ({ title, description, price, tags }) => {
  // const url = `${baseUrl}/products`;
  const url = `http://localhost:8000/products`;
  console.log(
    `PostProducts >> title::${title} | description::${description} | price::${price} | tags::${[
      ...tags,
    ]}`
  );

  try {
    const response = await axios.post(
      url,
      {
        title,
        description,
        price,
        tags: [...tags],
      },
      {
        headers: {
          "Content-Type": "application/json", // 반드시 JSON 형식임을 명시
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("api error in PostProducts :: " + err.message);
    throw new Error();
  }
};

export default PostProducts;
