"use client";

import React from "react";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { IconButton, Link, Stack, SxProps } from "@mui/material";
import { CommonInput } from "@/shared/components/Input/CommonInput";
import { CommonButton } from "@/shared/components/Buttons/CommonButton";
import { InputErrorMsg } from "@/shared/components/Input/InputErrorMsg";
import Image from "next/image";
import { SocialAuth } from "@/shared/components/auth/SocialAuth";
import { AuthHeaderLogo } from "@/shared/components/auth/AuthHeaderLogo";
import { useLoginPost } from "./core/hooks/useLoginPost";

export default function Page() {
  const {
    inputValue,
    emailError,
    handleInputValue,
    handleIsShowPassword,
    handlePasswordValueDelete,
    handleClickLogin,
    isShowPasswordText,
  } = useLoginPost();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                value={inputValue.email}
                onChange={handleInputValue}
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
                content="비밀번호"
                marginBottom="16px"
              />
              <CommonInput
                name="password"
                placeholder="비밀번호를 입력해주세요"
                height="56px"
                value={inputValue.password}
                onChange={handleInputValue}
                // isError={isPasswordSame === "notSame"}
                type={isShowPasswordText ? "text" : "password"}
                endAdornment={
                  <IconButton
                    onClick={handleIsShowPassword}
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
              {/* {isPasswordSame === "notSame" && (
                //TODO: 여기 비번 에러메시지 추가하고 거기에 맞는걸로 바꾸기
                <InputErrorMsg message={"비밀번호가 일치하지 않습니다."} />
              )} */}
            </Stack>

            <CommonButton
              type="submit"
              colorType="primary"
              disabled={true}
              title="로그인"
              width="100%"
              padding="16px"
              borderRadius="40px"
              textSize="text20Semibold"
            />
          </Stack>
        </form>
        <SocialAuth />
        <Stack
          width="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={"4px"}
        >
          <Typo
            className="text14Medium"
            color={colorChips.gray800}
            content="판다마켓이 처음이신가요?"
          />
          <Link href="/signup">
            <Typo
              className="text14Medium"
              color={colorChips.primary100}
              content="회원가입"
            />
          </Link>
        </Stack>
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
