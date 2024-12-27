export const REQUIRED_FIELDS = {
  GET: [
    ["page", "number"],
    ["pageSize", "number"],
    ["keyword", "string"],
  ],
  POST: {
    articles: [
      ["title", "string"],
      ["content", "string"],
      ["image", "string"],
    ],
    products: [
      ["name", "string"],
      ["description", "string"],
      ["price", "number"],
      ["manufacturer", "string"],
      ["tags", "object"],
      ["images", "object"],
    ],
  },
  PATCH: {
    articles: [
      ["title", "string"],
      ["content", "string"],
      ["image", "string"],
    ],
    products: [
      ["name", "string"],
      ["description", "string"],
      ["price", "number"],
      ["manufacturer", "string"],
      ["tags", "object"],
      ["images", "object"],
    ],
  },
};

export const INIT_GET_PARAMS = {
  page: 1,
  pageSize: 1000,
};
