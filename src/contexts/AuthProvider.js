import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import useLocalStorage from "@hooks/useLocalStorage";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  routeUnauth: () => {},
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const routeUnauth = (authUrl, unauthUrl) => {
    if (!user) router.push(unauthUrl);
    else router.push(authUrl);
  };

  const getMe = async () => {
    try {
      const res = await axiosClient.get("/users/me");
      const nextUser = res.data;
      setUser(nextUser);
    } catch (err) {}
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        routeUnauth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
};
