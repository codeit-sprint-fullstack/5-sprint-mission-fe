import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, saveToken, hasToken } from "@/services/authService";
import Modal from "@/components/common/Modal";
import Loading from "@/components/common/Loading";

const LoginPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      // 토큰 저장
      saveToken(data.accessToken);

      // 캐시 초기화 (로그인 후 데이터 리프레시)
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });

      // 로그인 성공 메시지 표시
      setModalMessage("로그인에 성공하였습니다");
      setIsModalOpen(true);
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
      setModalMessage(
        error.response?.data?.message ||
          "이메일 또는 비밀번호가 일치하지 않습니다."
      );
      setIsModalOpen(true);
    },
  });

  useEffect(() => {
    console.log("로그인 페이지 마운트: 토큰 확인");

    // 토큰 상태를 한번 더 명시적으로 확인
    const tokenExists = hasToken();
    console.log("토큰 존재 여부:", tokenExists);

    // 토큰이 있으면 items 페이지로 리디렉션
    if (tokenExists) {
      console.log("토큰 존재하여 /items로 리디렉션");
      router.replace("/items");
    } else {
      console.log("토큰 없음, 로그인 페이지 유지");

      // URL 쿼리 파라미터 확인
      const { expired } = router.query;
      if (expired === "true") {
        setModalMessage("로그인이 만료되었습니다. 다시 로그인해 주세요.");
        setIsModalOpen(true);
      }
    }
  }, [router]);

  const onSubmit = (data) => {
    console.log("로그인 시도:", data);
    loginMutation.mutate(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // 로그인 성공 메시지였다면 페이지 이동
    if (modalMessage === "로그인에 성공하였습니다") {
      const returnUrl = router.query.returnUrl || "/items";
      router.push(decodeURIComponent(returnUrl));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <PageWrapper>
      <LoginContainer>
        <PageHeader>
          <Link href="/">
            <img
              src="/panda-big-logo.svg"
              alt="pandalogo"
              className="big-logo"
            />
            <img src="/panda-logo.svg" alt="pandalogo" className="small-logo" />
          </Link>
        </PageHeader>
        <FormSection>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="email">
              <FieldLabel>이메일</FieldLabel>
              <InputWrapper>
                <StyledInput
                  className="email-input"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "잘못된 이메일 형식입니다.",
                    },
                  })}
                  error={!!errors.email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onKeyDown={handleKeyDown}
                  disabled={loginMutation.isPending}
                />
                {errors.email && (
                  <ValidationError>{errors.email.message}</ValidationError>
                )}
              </InputWrapper>
            </FormGroup>

            <FormGroup className="password">
              <FieldLabel>비밀번호</FieldLabel>
              <InputWrapper>
                <PasswordWrapper className="input-vector">
                  <StyledInput
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                      minLength: {
                        value: 8,
                        message: "비밀번호를 8자 이상 입력해주세요.",
                      },
                    })}
                    error={!!errors.password}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onKeyDown={handleKeyDown}
                    disabled={loginMutation.isPending}
                  />
                  {watch("password") && (
                    <PasswordVisibility
                      src={`/${
                        showPassword ? "vector-open.svg" : "vector-close.svg"
                      }`}
                      alt="password toggle"
                      onClick={togglePasswordVisibility}
                      className={showPassword ? "vector-open" : "vector"}
                    />
                  )}
                </PasswordWrapper>
                {errors.password && (
                  <ValidationError>{errors.password.message}</ValidationError>
                )}
              </InputWrapper>
            </FormGroup>

            <LoginButton
              type="submit"
              disabled={!isValid || loginMutation.isPending}
              className={isValid ? "login-button active" : "login-button"}
            >
              {loginMutation.isPending ? (
                <ButtonLoadingWrapper>
                  <Loading size="small" />
                </ButtonLoadingWrapper>
              ) : (
                "로그인"
              )}
            </LoginButton>
          </form>

          <SocialLogin className="Easylogin">
            <SocialLoginText>간편 로그인하기</SocialLoginText>
            <SocialButtonGroup className="Component">
              <SocialProvider href="https://www.google.com/" target="_blank">
                <img src="/ic-google-logo.svg" alt="google logo" />
              </SocialProvider>
              <SocialProvider
                href="https://www.kakaocorp.com/page/"
                target="_blank"
              >
                <img src="/ic-kakao-logo.svg" alt="kakao logo" />
              </SocialProvider>
            </SocialButtonGroup>
          </SocialLogin>

          <SignupArea className="signup">
            <SignupText>판다마켓이 처음이신가요?</SignupText>
            <Link href="/signup" passHref legacyBehavior>
              <SignupLink>회원가입</SignupLink>
            </Link>
          </SignupArea>
        </FormSection>
      </LoginContainer>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          message={modalMessage}
          buttonText="확인"
        />
      )}
    </PageWrapper>
  );
};

export default LoginPage;

// Styled Components
const PageWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 10px;
`;

const LoginContainer = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;
  padding: 20px;
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
  }

  @media (max-width: 743px) {
    .big-logo {
      display: none;
    }
    .small-logo {
      display: block;
    }
  }

  @media (min-width: 744px) {
    .big-logo {
      display: block;
    }
    .small-logo {
      display: none;
    }
  }
`;

const FormSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: ${(props) => (props.className === "password" ? "0" : "24px")};
`;

const FieldLabel = styled.p`
  font-size: 1.8em;
  font-weight: 700;
  margin: 0;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  padding-left: 24px;
  gap: 10px;
  font-size: 1.6em;
  line-height: 26px;
  background-color: #f3f4f6;
  border: ${(props) => (props.error ? "1px solid #F74747" : "none")};
  outline-color: ${(props) => (props.error ? "#F74747" : "#3692FF")};
  font-family: "Pretendard", sans-serif;
`;

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const PasswordVisibility = styled.img`
  cursor: pointer;
  position: absolute;
  right: 44px;
`;

const ValidationError = styled.div`
  color: #f74747;
  font-size: 1.5em;
  line-height: 17.9px;
  font-weight: 600;
  position: relative;
  left: 16px;
  top: 8px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 40px;
  text-align: center;
  gap: 10px;
  background-color: ${(props) => (props.disabled ? "#9CA3AF" : "#3692FF")};
  font-weight: 600;
  font-size: 2em;
  line-height: 32px;
  color: #f3f4f6;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  margin: 24px 0;
`;

const SocialLogin = styled.div`
  padding: 24px;
  height: 74px;
  border-radius: 8px;
  background-color: #e6f2ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 1.6em;
  line-height: 26px;
  margin-top: 0;
`;

const SocialLoginText = styled.p`
  margin: 0;
`;

const SocialButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialProvider = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SignupArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  font-size: 1.4em;
  font-weight: 500;
  line-height: 24px;
`;

const SignupText = styled.p`
  margin: 0;
`;

const SignupLink = styled.a`
  color: #3692ff;
  line-height: 16.71px;
  text-decoration: none;
  cursor: pointer;
`;

// 추가된 스타일 컴포넌트
const ButtonLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
`;
