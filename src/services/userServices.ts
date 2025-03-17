import { apiClient } from "@/lib/apiClient";
import {
  SignIn,
  UserInfo,
  UpdateAccessToken,
  Signup,
} from "@/types/apiResponse";

const login = async (email: string, password: string): Promise<SignIn> => {
  const signInResponse = await apiClient.post<SignIn>(
    "/auth/signin",
    {
      email,
      password,
    },
    { skipAuth: true }
  );
  return signInResponse;
};

const signup = async (
  email: string,
  nickname: string,
  password: string,
  passwordCheck: string
) => {
  const signupResponse = await apiClient.post<Signup>(
    "/auth/signup",
    {
      email,
      nickname,
      password,
      passwordConfirmation: passwordCheck,
    },
    { skipAuth: true }
  );
  return signupResponse;
};

const getUserInfo = async (): Promise<UserInfo> => {
  const userInfoResponse = await apiClient.get<UserInfo>("/users/me");
  return userInfoResponse;
};

const updateAccessToken = async (): Promise<UpdateAccessToken> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }
  const updateAccessTokenResponse = await apiClient.post<UpdateAccessToken>(
    "/auth/refresh-token",
    { refreshToken }
  );
  return updateAccessTokenResponse;
};

export default { login, signup, getUserInfo, updateAccessToken };
