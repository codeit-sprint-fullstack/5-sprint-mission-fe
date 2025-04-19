export interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileImg?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
