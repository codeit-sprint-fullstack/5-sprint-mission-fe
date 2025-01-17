export const url = new URL("https://panda-market-api.vercel.app/products");
const headers = {
  "Content-Type": "application/json",
};

// const getTest = ({
//   page: "test",
//   pageSize: 1000,
//   orderBy: "https://panda-market-api.vercel.app/products",
// })

// const posttest = {
//   name: "고양이",
//   description: "고양이 귀엽죠?",
//   price: 1234,
//   images: [
//     "https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg",
//   ],
//   tag: ["나만 없어 고양이"],
// };

async function getProductListInquiry(
  page = 1,
  pageSize = 10,
  orderBy = "recent"
) {
  try {
    const response = await fetch(
      `${url}?page=${page}&pageSize=${pageSize}&limit=3&orderBy=${orderBy}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("getProductListInquiry data : ", data);
    return data;
  } catch (err) {
    // console.log("getProductListInquiry err : ", err);
  }
}
const postProductRegistration = async (params) => {
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });
    const data = await response.json();
    // console.log("postProductRegistration Data : " + JSON.stringify(data));
    return data;
  } catch (error) {
    // console.log("postProductRegistration Error : " + error);
  }
};
// postProductRegistration(posttest);

export const apiList = {
  getProductListInquiry,
  postProductRegistration,
};
