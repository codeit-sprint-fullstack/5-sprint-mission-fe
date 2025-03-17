export interface SignIn {
  user: {
    id: number;
    nickname: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}
export interface Signup {
  user: {
    id: number;
    nickname: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}
export interface UserInfo {
  updatedAt: string;
  createdAt: string;
  image: string;
  nickname: string;
  id: number;
}

export interface UpdateAccessToken {
  accessToken: string;
}
