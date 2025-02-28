export interface PageIdParams {
  params: Promise<{ id: string }>;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  comments?: ArticleComment[];
}

export interface ArticleComment {
  id: string;
  content: string;
  author: string;
  articleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Query {
  limit: number;
  keyword: string;
  sortBy: SortBy;
  cursorId?: string;
}

export type SortBy = "latest" | "favorite";

// id 속성만 가져옴 1개만 반환, 없으면 never 반환
export type PK<T> = T extends { id: infer R } ? R : never;

// -Id로 끝나는 속성만 가져옴, 스키마에 따라 여러개의 FK가 있을 수 있으므로 K 지정하기
export type FK<T, K extends keyof T> = K extends `${string}Id` ? T[K] : never;

// 브랜트 타입스크립트
export type Brand<T, B> = T & { __brand: B };
