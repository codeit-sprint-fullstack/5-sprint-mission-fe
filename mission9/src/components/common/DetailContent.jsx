import React, { useState } from "react";
import styled from "@emotion/styled";
import LikeButton from "./LikeButton";

/* 기능: 상세 페이지 콘텐츠 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string[]} props.images - 이미지 URL 배열
 * @param {string} props.content - 상품 설명 텍스트
 * @param {string[]} props.tags - 상품 태그 배열
 */
const DetailContent = ({
  images = [],
  content = "내용이 없습니다.",
  tags = [],
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = images.length > 0 ? images : ["/img_default.svg"];

  /* 로직: 이미지 오류 처리 */
  const handleImageError = (e) => {
    if (e.target.src.includes("img_default.svg")) {
      e.target.onerror = null;
      return;
    }
    e.target.onerror = null;
    e.target.src = "/img_default.svg";
  };

  /* 로직: 이미지 갤러리 네비게이션 */
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <ContentContainer>
      <FlexContainer>
        <ImageSection>
          <ImageContainer>
            <ProductImage
              src={allImages[currentImageIndex]}
              alt="상품 이미지"
              onError={handleImageError}
            />

            {allImages.length > 1 && (
              <>
                <NavButtonLeft onClick={handlePrevImage}>&lt;</NavButtonLeft>
                <NavButtonRight onClick={handleNextImage}>&gt;</NavButtonRight>
                <ImageCounter>
                  {currentImageIndex + 1} / {allImages.length}
                </ImageCounter>
              </>
            )}
          </ImageContainer>

          {allImages.length > 1 && (
            <ThumbnailContainer>
              {allImages.map((img, index) => (
                <Thumbnail
                  key={index}
                  src={img}
                  alt={`썸네일 ${index + 1}`}
                  active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                  onError={handleImageError}
                />
              ))}
            </ThumbnailContainer>
          )}
        </ImageSection>

        <ContentSection>
          <SectionTitle>상품 소개</SectionTitle>
          <ContentText>{content}</ContentText>

          {tags && tags.length > 0 && (
            <>
              <SectionTitle>상품 태그</SectionTitle>
              <TagContainer>
                {tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagContainer>
            </>
          )}
        </ContentSection>
      </FlexContainer>
    </ContentContainer>
  );
};

/* 스타일: 레이아웃 컴포넌트 */
const ContentContainer = styled.div`
  padding: 0 2rem 2rem;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
`;

/* 스타일: 이미지 갤러리 컴포넌트 */
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const NavButtonLeft = styled(NavButton)`
  left: 10px;
`;

const NavButtonRight = styled(NavButton)`
  right: 10px;
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 14px;
`;

/* 스타일: 썸네일 컴포넌트 */
const ThumbnailContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#3692ff" : "transparent")};

  &:hover {
    opacity: 0.8;
  }
`;

/* 스타일: 콘텐츠 컴포넌트 */
const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 1.5rem 0 1rem;

  &:first-of-type {
    margin-top: 0;
  }
`;

const ContentText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  white-space: pre-wrap;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

export default DetailContent;
