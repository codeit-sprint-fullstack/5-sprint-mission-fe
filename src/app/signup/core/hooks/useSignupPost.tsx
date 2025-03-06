import { useUserStore } from "@/shared/store/useUserStore";
import { useRouter } from "next/navigation";
import { postSignUpApi } from "../service/postSignUpApi";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { setLocalStorage } from "@/shared/utils/setLocalStorage";

interface SignupProps {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const useSignupPost = ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignupProps) => {
  const router = useRouter();
  const changeCurrentUser = useUserStore((state) => state.setUserInfo);

  const handleClickSignup = async () => {
    const { openSnackbar } = useSnackbarStore.getState();

    try {
      const data = await postSignUpApi({
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirmation: passwordConfirmation,
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

      openSnackbar("회원가입이 완료되었습니다.");
      router.push("/items"); //중고마켓 페이지로 이동
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message;
      //TODO: 여기 에러메시지 확인해보고 분기 처리 추가할지 봐야될듯
      if (errorMessage) {
        openSnackbar("사용 중인 이메일입니다.");
      }
    }
  };

  return {
    handleClickSignup,
  };
};
