import { ReactNode } from "react";

export type User = {
  email: string;
  nickname: string;
  image: string | null;
};

export type SignupData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (requestData: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  signup: (
    userData: SignupData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};
