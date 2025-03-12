import React from "react";
import styled from "@emotion/styled";

const ArticleContainer = styled.article`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ArticleImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const ArticleContent = styled.div`
  padding: 2rem;
`;

const ArticleHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
`;

const ArticleTitle = styled.h1`
  font-size: 2rem;
  color: #111827;
  margin-bottom: 1rem;
`;

const ArticleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 0.875rem;
`;

const ArticleAuthor = styled.span`
  font-weight: 500;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #3692ff;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ArticleText = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  white-space: pre-wrap;
  margin-bottom: 2rem;
`;

const ArticleActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.primary ? "#3692ff" : "#f3f4f6")};
  color: ${(props) => (props.primary ? "#ffffff" : "#4b5563")};
  border: 1px solid ${(props) => (props.primary ? "#3692ff" : "#d1d5db")};
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.primary ? "#2a75cc" : "#e5e7eb")};
  }
`;

const ArticleBody = ({ article, onEdit, onDelete }) => {
  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <ArticleContainer>
      <ArticleImage src={article.imageUrl} />
      <ArticleContent>
        <ArticleHeader>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleInfo>
            <ArticleAuthor>{article.author.nickname}</ArticleAuthor>
            <ArticleMeta>
              <LikeCount>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {article.likes}
              </LikeCount>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </ArticleMeta>
          </ArticleInfo>
        </ArticleHeader>

        <ArticleText>{article.content}</ArticleText>

        <ArticleActions>
          <ActionButton onClick={onEdit}>수정</ActionButton>
          <ActionButton onClick={onDelete}>삭제</ActionButton>
        </ArticleActions>
      </ArticleContent>
    </ArticleContainer>
  );
};

export default ArticleBody;
