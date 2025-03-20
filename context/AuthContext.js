import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchUser, setAuthToken } from "../pages/api/user";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAuthToken(token);
        const userData = await fetchUser();
        if (userData) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          localStorage.removeItem("accessToken");
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (token, userData) => {
    console.log("로그인 성공, 상태 업데이트 중...");
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData)); // 유저 데이터 저장
    setAuthToken(token);
    setUser(userData); // 🔥 `{ me: userData }` 아님! 직접 저장
    router.push("/"); // 로그인 후 메인 페이지로 이동
  };

  const logout = () => {
    console.log("로그아웃 실행");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
