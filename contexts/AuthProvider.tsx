import UserCard from "@/types/userCard";
import api from "@/utils/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AuthContextCard {
  userData: UserCard | null;
  signout: () => void;
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextCard>({
  userData: null,
  signout: () => {},
  accessToken: "",
  setAccessToken: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const queryClient = useQueryClient();
  console.log("accessToken" , accessToken)

  useEffect(() => {
    if (accessToken) {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    }
  }, [accessToken]);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<UserCard>({
    queryKey: ["userData"],
    queryFn: getUserData,
    initialData: () => {
      const cachedUser = queryClient.getQueryData<UserCard>(["userData"]);
      return cachedUser ?? undefined;
    },
    initialDataUpdatedAt: Date.now(), // ✅ 최신 데이터로 인식
  });

  async function getUserData() {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              return await getUserData();
            }
        } else {
          console.error("예상치 못한 에러 발생 : ", err);
        }
      }
    }
    return null;
  }

  async function refreshAccessToken() {
    try {
      const res = await api.post(
        "/auth/refresh-token",
        {},
        {withCredentials: true}
      );
      const newAccessToken = res.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      queryClient.invalidateQueries({ queryKey: ["userData"] });

      return newAccessToken;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("토큰 갱신 실패", err);
        // signout();
      }
      return null;
    }
  }

  async function signout() {
    localStorage.setItem("accessToken", "");
    await api.post("/auth/signOut",{},{withCredentials: true});
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        userData: userData ?? null,
        isLoading,
        signout,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
