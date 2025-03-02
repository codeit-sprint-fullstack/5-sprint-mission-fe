import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

/**
 * 게시글 카드 컴포넌트
 * @param {object} article - 게시글 정보
 * @param {boolean} isBest - 베스트 게시글 여부
 */
const ArticleListCard = ({ article, isBest = false }) => {
  return (
    <Link href={`/article/${article.id}`} passHref legacyBehavior>
      {isBest ? (
        <BestArticleCard>
          <ContentWrapper isBest={isBest}>
            <BestBadge>
              <BestIcon src="/ic_medal.svg" alt="Medal" />
              Best
            </BestBadge>

            <MainContent isBest={isBest}>
              <TitleWrapper>
                <ArticleTitle isBest={isBest}>{article.title}</ArticleTitle>
              </TitleWrapper>
              <ArticleImage
                src={article.imageUrl}
                alt={article.title}
                isBest={isBest}
                onError={(e) => {
                  e.target.onerror = null; // 무한 루프 방지
                  e.target.src = "/img_default.svg"; // 기본 이미지 경로
                }}
              />
            </MainContent>
            <MetaContainer>
              <AuthorInfo>
                <ProfileImage src="/ic_profile.svg" alt="Profile" />
                <AuthorName>{article.author.nickname}</AuthorName>
                <CreatedAt>
                  {article.createdAt.slice(0, 10).replace(/-/g, ". ")}
                </CreatedAt>
              </AuthorInfo>
              <LikeCount>
                <LikeIcon src="/like.svg" alt="Like" />
                {article.likes}
              </LikeCount>
            </MetaContainer>
          </ContentWrapper>
        </BestArticleCard>
      ) : (
        <ArticleCard>
          <ContentWrapper isBest={isBest}>
            <MainContent>
              <div>
                <ArticleTitle isBest={isBest}>{article.title}</ArticleTitle>
                <ArticleContent>{article.content}</ArticleContent>
              </div>
              <ArticleImage
                src={article.imageUrl}
                alt={article.title}
                isBest={isBest}
                onError={(e) => {
                  e.target.onerror = null; // 무한 루프 방지
                  e.target.src = "/img_default.svg"; // 기본 이미지 경로
                }}
              />
            </MainContent>
            <MetaContainer>
              <AuthorInfo>
                <ProfileImage src="/ic_profile.svg" alt="Profile" />
                <AuthorName>{article.author.nickname}</AuthorName>
                <CreatedAt>
                  {article.createdAt.slice(0, 10).replace(/-/g, ". ")}
                </CreatedAt>
              </AuthorInfo>
              <LikeCount>
                <LikeIcon src="/like.svg" alt="Like" />
                {article.likes}
              </LikeCount>
            </MetaContainer>
          </ContentWrapper>
        </ArticleCard>
      )}
    </Link>
  );
};

// 일반 게시글 카드 스타일
const ArticleCard = styled.a`
  display: flex;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// 베스트 게시글 카드 스타일
const BestArticleCard = styled.a`
  display: flex;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 0 1.25rem 1.25rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleWrapper = styled.div`
  flex: 1;
  max-width: calc(100% - 100px);
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.isBest ? "center" : "flex-start")};
  gap: 1rem;
  margin-top: ${(props) => (props.isBest ? "0.75rem" : "0")};

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ArticleTitle = styled.h3`
  font-size: ${(props) => (props.isBest ? "1rem" : "1.125rem")};
  font-weight: 600;
  color: #111827;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  margin: 0;
  flex: 1;
`;

const ArticleContent = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  margin: 0;
`;

const ArticleImage = styled.img`
  width: ${(props) => (props.isBest ? "70px" : "120px")};
  height: ${(props) => (props.isBest ? "70px" : "120px")};
  object-fit: cover;
  border-radius: 4px;
  background-color: #f3f4f6;
  flex-shrink: 0;
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.75rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
`;

const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const AuthorName = styled.span`
  font-weight: 500;
`;

const CreatedAt = styled.span`
  color: #9ca3af;
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 600;
`;

const LikeIcon = styled.img`
  width: 21px;
  height: 18px;
`;

const BestBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #3b82f6;
  color: white;
  border-radius: 0 0 16px 16px;
  font-size: 1rem;
  font-weight: 600;
  width: 102px;
  height: 30px;
  padding: 0 12px;
  margin: 0;
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

const BestIcon = styled.img`
  /* width: 14px;
  height: 14px; */
`;

export default ArticleListCard;
