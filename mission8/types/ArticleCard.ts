export interface ArticleCard {
  id:string;
  idx:number;
  title:string;
  content:string;
  createdAt:string;
  updatedAt:string;
  comments?:CommentCard[];
}

export interface CommentCard {
  id:string;
  content:string;
  updatedAt:string;
  createdAt:string;
}