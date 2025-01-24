const url = new URL("http://localhost:8000");
const headers = {
  "Content-Type": "application/json",
};

const ProductList = async (currentPage = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${url}item?limit=${limit}&currentPage=${currentPage}`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ProductList Error : ", error);
  }
};

const ProductRegister = async (params) => {
  try {
    // 슬래쉬가 왜 포함이 되어 있어서 오류가 나는거지 어디서 슬래쉬가 추가가 된거지?
    const response = await fetch(`${url}register`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ProductRegister Error : ", error);
  }
};
const asd = {
  name: "제목",
  price: 100,
  description: "아무튼 개쩌는 내용",
  tags: "해쉬태그",
};
ProductRegister(asd);

export const apiList = {
  ProductList,
  ProductRegister,
};
