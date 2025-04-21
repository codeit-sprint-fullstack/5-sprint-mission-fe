import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./AuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types";

interface LoginParams {
  email: string;
  password: string;
}

interface SignupParams {
  email: string;
  password: string;
  nickname: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const useLogin = (onError?: () => void) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  return useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: async (data: LoginParams) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: ({ accessToken, user }) => {
      localStorage.setItem("accessToken", accessToken);
      setAuth(user);
      const redirect = searchParams.get("redirectUrl") || "/";
      router.replace(redirect);
    },
    onError: () => {
      onError?.();
    },
  });
};

export const useSignup = (onError?: () => void) => {
  const router = useRouter();

  return useMutation<AuthResponse, Error, SignupParams>({
    mutationFn: async (data: SignupParams) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      router.replace("/login");
    },
    onError: () => {
      onError?.();
    },
  });
};
