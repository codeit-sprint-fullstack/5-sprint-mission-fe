export interface Article {
  id: string;
  title: string;
  content: string;
  favoriteCount: number;
  createdAt: string;
  writer: {
    id: string;
    nickname: string;
  };
  isFavorite?: boolean;
}

export interface ArticleResponse {
  articles: Article[];
  totalPages: number;
}
