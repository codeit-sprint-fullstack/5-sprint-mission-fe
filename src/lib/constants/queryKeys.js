// queryKey 상수 정의

export const QUERY_KEYS = {
  Articles: {
    all: ["articles"],
    best: (limit) => [...QUERY_KEYS.Articles.all, "best", { limit }],
    list: (params) => [
      ...QUERY_KEYS.Articles.all,
      "list",
      {
        offset: params.offset,
        limit: params.limit,
        sort: params.sort,
        keyword: params.keyword,
      },
    ],
    detail: (articleId) => [
      ...QUERY_KEYS.Articles.all,
      "detail",
      { articleId },
    ],
    comments: {
      list: (articleId) => [
        ...QUERY_KEYS.Articles.all,
        "comments",
        { articleId },
      ],
      detail: (commentId) => [
        ...QUERY_KEYS.Articles.all,
        "comments",
        { commentId },
      ],
    },
  },
};
