export const commentKeys = {
  all: ["comment"] as const,
  list: (itemId: string, type: string) =>
    [...commentKeys.all, itemId, type] as const,
};

export const articleKeys = {
  all: ["articles"] as const,
  best: (limit: number) => [...articleKeys.all, "best", limit] as const,
  list: (params: { keyword: string; page: number; sort: string }) =>
    [...articleKeys.all, "list", params] as const,
  detail: (articleId: string) =>
    [...articleKeys.all, "detail", articleId] as const,
};

export const productKeys = {
  all: ["products"] as const,
  list: (params: { keyword: string; page: number; sort: string }) =>
    [...productKeys.all, "list", params] as const,
};
