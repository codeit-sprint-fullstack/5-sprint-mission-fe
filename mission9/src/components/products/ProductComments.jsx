import React from "react";
import styled from "@emotion/styled";
import { hasToken } from "@/services/authService";

/**
 * 상품 댓글 컴포넌트
 */
const ProductComments = ({
  allComments = [],
  comments = [],
  commentPage = 1,
  totalCommentPages = 1,
  hasNextCommentPage = false,
  hasPrevCommentPage = false,
  commentText = "",
  editingCommentId = null,
  editText = "",
  setCommentText,
  setEditText,
  onCommentSubmit,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  onCommentDelete,
  onPageChange,
}) => {
  const formatDate = (dateString) => {
    try {
      if (!dateString) {
        return "날짜 정보 없음";
      }

      const date = new Date(dateString);

      // 유효한 날짜인지 확인
      if (isNaN(date.getTime())) {
        console.error("유효하지 않은 날짜 형식:", dateString);
        return "날짜 정보 없음";
      }

      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return "날짜 정보 없음";
    }
  };

  // 로그인 여부 확인 - 서버 사이드 렌더링 고려
  const isLoggedIn = typeof window !== "undefined" ? hasToken() : false;

  return (
    <CommentsSection id="comments-section">
      <CommentHeader>
        <CommentCount>
          댓글 <CommentCountNumber>{allComments.length}</CommentCountNumber>
        </CommentCount>
      </CommentHeader>

      {/* 댓글 작성 폼 */}
      {isLoggedIn ? (
        <CommentForm onSubmit={onCommentSubmit}>
          <CommentTextArea
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <CommentSubmitButton type="submit" disabled={!commentText.trim()}>
            등록
          </CommentSubmitButton>
        </CommentForm>
      ) : (
        <LoginMessage>댓글을 작성하려면 로그인이 필요합니다.</LoginMessage>
      )}

      {/* 댓글 목록 */}
      {comments.length > 0 ? (
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              {editingCommentId === comment.id ? (
                // 댓글 수정 폼
                <EditForm
                  onSubmit={(e) => {
                    e.preventDefault();
                    onEditSubmit(comment.id);
                  }}
                >
                  <CommentTextArea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <EditButtonGroup>
                    <CommentSubmitButton
                      type="submit"
                      disabled={!editText.trim()}
                    >
                      수정
                    </CommentSubmitButton>
                    <CommentCancelButton type="button" onClick={onEditCancel}>
                      취소
                    </CommentCancelButton>
                  </EditButtonGroup>
                </EditForm>
              ) : (
                // 댓글 내용
                <>
                  <CommentMeta>
                    <AuthorInfo>
                      <ProfileImage src="/ic_profile.svg" alt="Profile" />
                      <AuthorName>
                        {comment.writer?.nickname || "익명"}
                      </AuthorName>
                      <CommentDate>
                        {formatDate(comment.createdAt || new Date())}
                      </CommentDate>
                    </AuthorInfo>
                    <CommentActions>
                      <ActionButton
                        onClick={() => onEditStart(comment)}
                        isVisible={comment.isMine === true}
                      >
                        수정
                      </ActionButton>
                      <ActionButton
                        onClick={() => onCommentDelete(comment.id)}
                        isVisible={comment.isMine === true}
                      >
                        삭제
                      </ActionButton>
                    </CommentActions>
                  </CommentMeta>
                  <CommentContent>{comment.content}</CommentContent>
                </>
              )}
            </CommentItem>
          ))}
        </CommentList>
      ) : (
        <NoComments>
          {allComments.length > 0
            ? "이 페이지에 댓글이, 없습니다"
            : "첫 댓글을 남겨보세요!"}
        </NoComments>
      )}

      {/* 페이지네이션 */}
      {totalCommentPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => onPageChange(commentPage - 1)}
            disabled={!hasPrevCommentPage}
          >
            이전
          </PageButton>
          <PageInfo>
            {commentPage} / {totalCommentPages}
          </PageInfo>
          <PageButton
            onClick={() => onPageChange(commentPage + 1)}
            disabled={!hasNextCommentPage}
          >
            다음
          </PageButton>
        </Pagination>
      )}
    </CommentsSection>
  );
};

// 스타일 컴포넌트
const CommentsSection = styled.section`
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const CommentHeader = styled.div`
  margin-bottom: 1rem;
`;

const CommentCount = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
`;

const CommentCountNumber = styled.span`
  margin-left: 0.5rem;
  color: #3692ff;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  resize: vertical;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3692ff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CommentSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2a75cc;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const CommentCancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const LoginMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem 0;

  &:first-of-type {
    border-top: 1px solid #e5e7eb;
  }
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const AuthorName = styled.span`
  font-weight: 500;
  color: #374151;
`;

const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #6b7280;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? "inline" : "none")};

  &:hover {
    color: #374151;
    text-decoration: underline;
  }
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #374151;
  white-space: pre-wrap;
`;

const EditForm = styled.form``;

const EditButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  margin: 0 1rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const NoComments = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
`;

export default ProductComments;
