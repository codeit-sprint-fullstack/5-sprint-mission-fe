import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import RegistrationManager from "@/components/products/RegistrationProduct/RegistrationManager";
import { hasToken } from "@/services/authService";

// 상품 등록 페이지
const RegistrationPage = () => {
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      // 로그인 상태 확인
      const isLoggedIn = hasToken();

      // 로그인하지 않은 경우 로그인 페이지로 리디렉션
      if (!isLoggedIn) {
        console.log("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        // 현재 URL을 저장하여 로그인 후 돌아올 수 있도록 함
        const returnUrl = encodeURIComponent(router.asPath);
        router.push(`/login?returnUrl=${returnUrl}`);
      }
    }
  }, [router]);

  return (
    <Container>
      <RegistrationManager />
    </Container>
  );
};

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 26px;
  border-radius: 8px;

  @media (max-width: 1199px) and (min-width: 744px) {
    width: 90%;
  }

  @media (max-width: 743px) {
    width: 95%;
  }
`;

export default RegistrationPage;
