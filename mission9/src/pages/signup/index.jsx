import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp, saveToken, hasToken } from "@/services/authService";
import Modal from "@/components/common/Modal";
import Loading from "@/components/common/Loading";

const SignupPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [nicknameFocused, setNicknameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const signupMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      // 토큰 저장
      saveToken(data.accessToken);

      // 캐시 초기화 (회원가입 후 데이터 리프레시)
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });

      // 가입 완료 메시지 표시
      setModalMessage("가입 완료되었습니다.");
      setIsModalOpen(true);
    },
    onError: (error) => {
      console.error("회원가입 오류:", error);
      setModalMessage(
        error.response?.data?.message || "사용 중인 이메일입니다."
      );
      setIsModalOpen(true);
    },
  });

  useEffect(() => {
    // 이미 로그인한 경우 상품 목록 페이지로 리디렉션
    if (hasToken()) {
      router.replace("/items");
    }
  }, [router]);

  const onSubmit = (data) => {
    // confirmPassword를 passwordConfirmation으로 변경하여 API에 전송
    const { confirmPassword, ...rest } = data;
    const signupData = {
      ...rest,
      passwordConfirmation: confirmPassword,
    };
    console.log("회원가입 시도:", signupData);
    signupMutation.mutate(signupData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // 회원가입 성공 메시지였다면 페이지 이동
    if (modalMessage === "가입 완료되었습니다.") {
      router.push("/items");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <PageWrapper>
      <SignupContainer>
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
                  disabled={signupMutation.isPending}
                />
                {errors.email && (
                  <ValidationError>{errors.email.message}</ValidationError>
                )}
              </InputWrapper>
            </FormGroup>

            <FormGroup className="nickname">
              <FieldLabel>닉네임</FieldLabel>
              <InputWrapper>
                <StyledInput
                  className="nickname-input"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickname", {
                    required: "닉네임을 입력해주세요.",
                    minLength: {
                      value: 2,
                      message: "닉네임을 2자 이상 입력해주세요.",
                    },
                    maxLength: {
                      value: 10,
                      message: "닉네임은 10자 이하로 입력해주세요.",
                    },
                  })}
                  error={!!errors.nickname}
                  onFocus={() => setNicknameFocused(true)}
                  onBlur={() => setNicknameFocused(false)}
                  onKeyDown={handleKeyDown}
                  disabled={signupMutation.isPending}
                />
                {errors.nickname && (
                  <ValidationError>{errors.nickname.message}</ValidationError>
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
                      pattern: {
                        value:
                          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                        message:
                          "영문, 숫자, 특수문자를 포함하여 8-20자로 입력해주세요.",
                      },
                    })}
                    error={!!errors.password}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onKeyDown={handleKeyDown}
                    disabled={signupMutation.isPending}
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

            <FormGroup className="confirm-password">
              <FieldLabel>비밀번호 확인</FieldLabel>
              <InputWrapper>
                <PasswordWrapper className="input-vector">
                  <StyledInput
                    className="confirm-password-input"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력해주세요"
                    {...register("confirmPassword", {
                      required: "비밀번호 확인을 입력해주세요.",
                      validate: (value) =>
                        value === password || "비밀번호가 일치하지 않습니다.",
                    })}
                    error={!!errors.confirmPassword}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    onKeyDown={handleKeyDown}
                    disabled={signupMutation.isPending}
                  />
                  {watch("confirmPassword") && (
                    <PasswordVisibility
                      src={`/${
                        showConfirmPassword
                          ? "vector-open.svg"
                          : "vector-close.svg"
                      }`}
                      alt="password toggle"
                      onClick={toggleConfirmPasswordVisibility}
                      className={showConfirmPassword ? "vector-open" : "vector"}
                    />
                  )}
                </PasswordWrapper>
                {errors.confirmPassword && (
                  <ValidationError>
                    {errors.confirmPassword.message}
                  </ValidationError>
                )}
              </InputWrapper>
            </FormGroup>

            <SignupButton
              type="submit"
              disabled={!isValid || signupMutation.isPending}
              className={isValid ? "signup-button active" : "signup-button"}
            >
              {signupMutation.isPending ? (
                <ButtonLoadingWrapper>
                  <Loading size="small" />
                </ButtonLoadingWrapper>
              ) : (
                "회원가입"
              )}
            </SignupButton>
          </form>

          <LoginArea className="login">
            <LoginText>이미 판다마켓 회원이신가요?</LoginText>
            <Link href="/login" passHref legacyBehavior>
              <LoginLink>로그인</LoginLink>
            </Link>
          </LoginArea>
        </FormSection>
      </SignupContainer>

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

export default SignupPage;

// Styled Components
const PageWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 10px;
`;

const SignupContainer = styled.div`
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
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const FieldLabel = styled.p`
  font-size: 1.8em;
  font-weight: 700;
  margin: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const SignupButton = styled.button`
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

const LoginArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  font-size: 1.4em;
  font-weight: 500;
  line-height: 24px;
`;

const LoginText = styled.p`
  margin: 0;
`;

const LoginLink = styled.a`
  color: #3692ff;
  line-height: 16.71px;
  text-decoration: none;
  cursor: pointer;
`;

const ButtonLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
`;
