export interface Comment {
  id: string;
  user?: {
    nickname: string;
    image?: string;
    [key: string]: any;
  };
  userId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  list?: Comment[];
  comments?: Comment[];
  writer?: {
    id: string;
    image?: string;
    nickname: string;
  };
  nextCursor: number | null;
}
