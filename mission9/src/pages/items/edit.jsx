import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import EditManager from "@/components/products/RegistrationProduct/EditManager";
import { hasToken } from "@/services/authService";
import { checkUserPermission } from "@/services/productService";
import Loading from "@/components/common/Loading";

// 상품 수정 페이지
const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 로그인 상태 및 권한 확인
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined" && router.isReady) {
      // 로그인 상태 확인
      const isLoggedIn = hasToken();

      // 로그인하지 않은 경우 로그인 페이지로 리디렉션
      if (!isLoggedIn) {
        console.log("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        const returnUrl = encodeURIComponent(router.asPath);
        router.push(`/login?returnUrl=${returnUrl}`);
        return;
      }

      // id 파라미터가 없는 경우 목록 페이지로 이동
      if (!id) {
        console.log("상품 ID가 없습니다. 목록 페이지로 이동합니다.");
        router.push("/items");
        return;
      }
    }
  }, [router, id]);

  // 로딩 중일 때 표시할 컴포넌트
  if (!router.isReady) {
    return <Loading />;
  }

  return (
    <Container>
      <EditManager />
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

export default EditPage;
