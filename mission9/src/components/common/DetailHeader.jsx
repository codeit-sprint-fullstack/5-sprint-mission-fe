import React from "react";
import styled from "@emotion/styled";
import KebabMenu from "./KebabMenu";

/**
 * 상세 페이지 헤더 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.title - 제목
 * @param {number} props.price - 가격 (상품인 경우)
 * @param {object} props.author - 작성자 정보 (nickname, id)
 * @param {string} props.createdAt - 생성 날짜
 * @param {string} props.updatedAt - 수정 날짜
 * @param {number} props.viewCount - 조회수
 * @param {function} props.onEdit - 수정 버튼 클릭 핸들러
 * @param {function} props.onDelete - 삭제 버튼 클릭 핸들러
 * @param {boolean} props.hasPermission - 수정/삭제 권한 여부
 */
const DetailHeader = ({
  title = "제목 없음",
  price,
  author = { nickname: "작성자 없음", id: 0 },
  createdAt,
  updatedAt,
  viewCount,
  onEdit,
  onDelete,
  hasPermission = false,
}) => {
  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";

    try {
      // ISO 형식 문자열인지 확인
      if (typeof dateString === "string" && dateString.includes("T")) {
        return new Date(dateString).toLocaleDateString().replace(/\./g, ". ");
      }

      // 이미 Date 객체인 경우
      if (dateString instanceof Date) {
        return dateString.toLocaleDateString().replace(/\./g, ". ");
      }

      // 숫자(타임스탬프)인 경우
      if (typeof dateString === "number") {
        return new Date(dateString).toLocaleDateString().replace(/\./g, ". ");
      }

      // 기타 형식인 경우
      return dateString.toString();
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error, dateString);
      return "날짜 정보 오류";
    }
  };

  const formattedDate = formatDate(createdAt);

  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <KebabMenu
          onEdit={onEdit}
          onDelete={onDelete}
          hasPermission={hasPermission}
        />
      </TitleContainer>

      {price !== undefined && (
        <PriceContainer>
          <Price>{Number(price).toLocaleString()}원</Price>
        </PriceContainer>
      )}

      <Divider />
    </HeaderContainer>
  );
};

// 스타일 컴포넌트
const HeaderContainer = styled.div`
  padding: 2rem 2rem 0;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #111827;
  margin: 0;
  word-break: break-word;
  flex: 1;
`;

const PriceContainer = styled.div`
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e5e7eb;
  margin: 1rem 0;
`;

export default DetailHeader;
