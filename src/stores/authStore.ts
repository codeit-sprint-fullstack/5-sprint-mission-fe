import { create } from "zustand";
import userServices from "@/services/userServices";
import { SignIn, UserInfo, Signup } from "@/types/apiResponse";

interface AuthState {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    nickname: string,
    password: string,
    passwordCheck: string
  ) => Promise<boolean>;
  logout: () => void;
  getUserInfo: () => Promise<UserInfo>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  login: async (email: string, password: string) => {
    const response: SignIn = await userServices.login(email, password);

    if (response.accessToken) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },

  signup: async (
    email: string,
    nickname: string,
    password: string,
    passwordCheck: string
  ) => {
    const response: Signup = await userServices.signup(
      email,
      nickname,
      password,
      passwordCheck
    );

    if (response.accessToken) {
      return true;
    }
    return false;
  },

  logout: () => {
    // 토큰을 로컬 스토리지에서 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ isLoggedIn: false });
  },

  // 유저 인포도 실패할 수 있는데...
  getUserInfo: async () => {
    const response: UserInfo = await userServices.getUserInfo();
    return response;
  },

  checkAuth: () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ isLoggedIn: true });
    }
  },
}));
