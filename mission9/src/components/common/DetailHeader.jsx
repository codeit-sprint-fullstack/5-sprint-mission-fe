import React from "react";
import styled from "@emotion/styled";
import KebabMenu from "./KebabMenu";

/* 기능: 상세 페이지 헤더 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.title - 제목
 * @param {number} props.price - 가격 (선택사항)
 * @param {object} props.author - 작성자 정보
 * @param {string} props.author.nickname - 작성자 닉네임
 * @param {number} props.author.id - 작성자 ID
 * @param {string} props.createdAt - 생성 날짜 (ISO 문자열)
 * @param {string} props.updatedAt - 수정 날짜 (ISO 문자열)
 * @param {number} props.viewCount - 조회수
 * @param {function} props.onEdit - 수정 핸들러
 * @param {function} props.onDelete - 삭제 핸들러
 * @param {boolean} props.hasPermission - 수정/삭제 권한
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
  /* 로직: 날짜 포맷팅
   * @param {string|number|Date} dateString - 변환할 날짜
   * @returns {string} 포맷팅된 날짜 문자열
   */
  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";

    try {
      if (typeof dateString === "string" && dateString.includes("T")) {
        return new Date(dateString).toLocaleDateString().replace(/\./g, ". ");
      }

      if (dateString instanceof Date) {
        return dateString.toLocaleDateString().replace(/\./g, ". ");
      }

      if (typeof dateString === "number") {
        return new Date(dateString).toLocaleDateString().replace(/\./g, ". ");
      }

      return dateString.toString();
    } catch (error) {
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

/* 스타일: 레이아웃 컴포넌트 */
const HeaderContainer = styled.div`
  padding: 2rem 2rem 0;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e5e7eb;
  margin: 1rem 0;
`;

/* 스타일: 콘텐츠 컴포넌트 */
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

export default DetailHeader;
