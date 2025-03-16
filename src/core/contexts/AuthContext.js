import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  loginAPI,
  signUpAPI,
  refreshTokenAPI,
  getUserInfo,
} from "@/core/services/auth";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    const fetchData = async () => {
      if (storedAccessToken) {
        try {
          setAccessToken(storedAccessToken);
          const userData = await getUserInfo(storedAccessToken);
          setUser(userData);
        } catch {
          await handleTokenRefresh(storedRefreshToken);
        }
      } else if (storedRefreshToken) {
        await handleTokenRefresh(storedRefreshToken);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const login = async (data) => {
    try {
      const { accessToken, refreshToken, user } = await loginAPI(data);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

      router.push(currentUrl || "/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const signup = async (data) => {
    try {
      const { accessToken, refreshToken, user } = await signUpAPI(data);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

      router.push("/auth/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleTokenRefresh = async (storedRefreshToken) => {
    if (!storedRefreshToken) {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return;
    }

    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshTokenAPI(storedRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      const userData = await getUserInfo(newAccessToken);
      setUser(userData);
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const setRedirectUrl = (url) => {
    setCurrentUrl(url);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        signup,
        logout,
        isLoading,
        setRedirectUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
