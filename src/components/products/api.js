export async function fetchAllProducts() {
  let page = 1;
  const pageSize = 10;
  let allItems = []; // 누적할 배열
  let totalCount = 0;

  // 반복적으로 fetch해서 'allItems'가 totalCount보다 작으면 계속 가져옴
  while (true) {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?page=${page}&size=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    // data 구조: { list: [...], totalCount: 204 }

    if (page === 1) {
      // 첫 페이지 응답에서 totalCount를 확인
      totalCount = data.totalCount;
    }

    // 누적
    allItems = [...allItems, ...data.list];

    // 모든 아이템을 다 가져왔다면 break
    if (allItems.length >= totalCount) {
      break;
    }

    page++;
  }

  return allItems; // 최종적으로 204개의 아이템(혹은 그 이상)이 담긴 배열
}
