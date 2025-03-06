import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/shared/store/useUserStore";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { postSignInApi } from "../service/postSignInApi";
import { setLocalStorage } from "@/shared/utils/setLocalStorage";

export const useLoginPost = () => {
  const [isShowPasswordText, setIsShowPasswordText] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });

  const router = useRouter();
  const changeCurrentUser = useUserStore((state) => state.setUserInfo);
  const { openSnackbar } = useSnackbarStore.getState();

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    //TODO: 비번 입력중일 때 8자 이상 체크 추가
    // 이메일 입력 중일 때만 유효성 검사
    if (name === "email" && value.length > 0) {
      setEmailError({
        isError: !validateEmail(value),
        message: !validateEmail(value) ? "잘못된 이메일 형식입니다." : "",
      });
    } else if (name === "email" && value.length === 0) {
      setEmailError({ isError: false, message: "" });
    }
  };

  const handleIsShowPassword = () => setIsShowPasswordText(!isShowPasswordText);
  const handlePasswordValueDelete = () =>
    setInputValue({ ...inputValue, password: "" });

  const handleClickLogin = async () => {
    try {
      const data = await postSignInApi({
        email: inputValue.email,
        password: inputValue.password,
      });

      // 로컬스토리지에 토큰 저장
      setLocalStorage({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      // 전역 user 데이터 업데이트
      changeCurrentUser({
        id: data.user.id,
        nickname: data.user.nickname,
        image: data.user.image,
        updatedAt: data.user.updatedAt,
        createdAt: data.user.createdAt,
      });

      openSnackbar("로그인되었습니다.");
      router.push("/items"); //중고마켓 페이지로 이동
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message;
      //TODO: 여기 에러메시지 확인해보고 분기 처리 추가할지 봐야될듯
      if (errorMessage) {
        openSnackbar("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return {
    isShowPasswordText,
    inputValue,
    emailError,
    handleInputValue,
    handleIsShowPassword,
    handlePasswordValueDelete,
    handleClickLogin,
  };
};
