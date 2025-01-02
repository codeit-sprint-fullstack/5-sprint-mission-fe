export const REQUIRED_FIELDS = {
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
};

export const BASE_URL = {
  sprint: "https://sprint-mission-api.vercel.app/",
};
