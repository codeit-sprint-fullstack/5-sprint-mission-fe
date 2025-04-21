export interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  description: string;
  tags?: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface ProductsResponse {
  list: Product[];
  nextCursor: number | null;
  totalCount?: number;
}

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  images?: File[] | string[]; // File 객체 또는 기존 이미지 URL 배열
  tags?: string[];
  existingImages?: string[]; // 기존 이미지 URL을 별도로 저장하기 위한 속성
}
