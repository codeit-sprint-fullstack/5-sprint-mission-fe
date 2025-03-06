"use client";

import React from "react";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { IconButton, Stack, SxProps } from "@mui/material";
import { CommonInput } from "@/shared/components/Input/CommonInput";
import { CommonButton } from "@/shared/components/Buttons/CommonButton";
import { useSignupInput } from "./core/hooks/useSignupInput";
import { useSignupPost } from "./core/hooks/useSignupPost";
import { InputErrorMsg } from "@/shared/components/Input/InputErrorMsg";
import Image from "next/image";
import { SocialAuth } from "@/shared/components/auth/SocialAuth";
import { AuthHeaderLogo } from "@/shared/components/auth/AuthHeaderLogo";

export default function Page() {
  const {
    email,
    emailError,
    handleEmailChange,
    isEmailValid,
    nickname,
    handleNicknameChange,
    inputPassword,
    isShowPasswordText,
    isShowConfirmPasswordText,
    isPasswordSame,
    isPasswordValid,
    handleInputPw,
    handleIsShowPassword,
  } = useSignupInput();

  const { handleClickSignup } = useSignupPost({
    email,
    nickname: "",
    password: inputPassword.password,
    passwordConfirmation: inputPassword.confirmPassword,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClickSignup();
  };

  const isSubmitEnabled = isEmailValid(email) && isPasswordValid;

  const showPwOff = "/assets/ic_pw_show_off.svg";
  const showPwOn = "/assets/ic_pw_show_on.svg";

  return (
    <Stack sx={AuthPageSx}>
      <AuthHeaderLogo />
      <Stack width="100%" direction="column" gap="24px">
        <form onSubmit={handleSubmit}>
          <Stack width="100%" direction="column" gap="24px">
            <Stack sx={inputStackSx}>
              <Typo
                className="text18Bold"
                color={colorChips.gray800}
                content="이메일"
                marginBottom="16px"
              />
              <CommonInput
                name="email"
                placeholder="이메일을 입력해주세요"
                height="56px"
                value={email}
                onChange={handleEmailChange}
                isError={emailError.isError}
              />
              {emailError.isError && (
                <InputErrorMsg message={emailError.message} />
              )}
            </Stack>

            <Stack sx={inputStackSx}>
              <Typo
                className="text18Bold"
                color={colorChips.gray800}
                content="닉네임"
                marginBottom="16px"
              />
              <CommonInput
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                height="56px"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </Stack>

            <Stack sx={inputStackSx}>
              <Typo
                className="text18Bold"
                color={colorChips.gray800}
                content="비밀번호"
                marginBottom="16px"
              />
              <CommonInput
                name="password"
                placeholder="비밀번호를 입력해주세요"
                height="56px"
                value={inputPassword.password}
                onChange={handleInputPw}
                isError={isPasswordSame === "notSame"}
                type={isShowPasswordText ? "text" : "password"}
                endAdornment={
                  <IconButton
                    onClick={() => handleIsShowPassword("password")}
                    sx={{ cursor: "pointer" }}
                  >
                    <Image
                      src={isShowPasswordText ? showPwOn : showPwOff}
                      alt="show password"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                }
              />
              {isPasswordSame === "notSame" && (
                //TODO: 여기 비번 에러메시지 추가하고 거기에 맞는걸로 바꾸기
                <InputErrorMsg message={"비밀번호가 일치하지 않습니다."} />
              )}
            </Stack>

            <Stack sx={inputStackSx}>
              <Typo
                className="text18Bold"
                color={colorChips.gray800}
                content="비밀번호 확인"
                marginBottom="16px"
              />
              <CommonInput
                name="passwordConfirmation"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                height="56px"
                value={inputPassword.confirmPassword}
                onChange={handleInputPw}
                isError={isPasswordSame === "notSame"}
                type={isShowConfirmPasswordText ? "text" : "password"}
                endAdornment={
                  <IconButton
                    onClick={() => handleIsShowPassword("password")}
                    sx={{ cursor: "pointer" }}
                  >
                    <Image
                      src={isShowPasswordText ? showPwOn : showPwOff}
                      alt="show password"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                }
              />
              {isPasswordSame === "notSame" && (
                //TODO: 여기 비번 에러메시지 추가하고 거기에 맞는걸로 바꾸기
                <InputErrorMsg message={"비밀번호가 일치하지 않습니다."} />
              )}
            </Stack>

            <CommonButton
              type="submit"
              colorType="primary"
              disabled={!isSubmitEnabled}
              title="회원가입"
              width="100%"
              padding="16px"
              borderRadius="40px"
              textSize="text20Semibold"
              textColor={colorChips.gray100}
            />
          </Stack>
        </form>
        <SocialAuth />
      </Stack>
    </Stack>
  );
}

const AuthPageSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: { xs: "24px", sm: "40px" },
  width: "100%",
  maxWidth: "640px",
  height: "100%",
  margin: "0 auto",
  paddingX: { xs: "16px", sm: "24px" },
  paddingTop: "60px",
  paddingBottom: "100px",
};

const inputStackSx = {
  width: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
} as const;
