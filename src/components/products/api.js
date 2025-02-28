export async function fetchAllProducts() {
  let page = 1;
  const pageSize = 10;
  let allItems = [];
  let totalCount = 0;

  while (true) {
    const response = await fetch(
      `https://pandamarket-api.vercel.app/products?page=${page}&size=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    if (page === 1) {
      totalCount = data.totalCount;
    }

    allItems = [...allItems, ...data.list];

    if (allItems.length >= totalCount) {
      break;
    }

    page++;
  }

  return allItems;
}
