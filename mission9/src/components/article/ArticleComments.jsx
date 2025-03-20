import React, { useState } from "react";
import styled from "@emotion/styled";
import Pagination from "@/components/common/Pagination";

/**
 * 게시글 댓글 컴포넌트
 */
const ArticleComments = ({
  allComments,
  comments,
  commentPage,
  totalCommentPages,
  hasNextCommentPage,
  hasPrevCommentPage,
  commentText,
  editingCommentId,
  editText,
  setCommentText,
  setEditText,
  onCommentSubmit,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  onCommentDelete,
  onPageChange,
}) => {
  return (
    <CommentSection id="comments-section">
      <CommentHeader>
        <CommentTitle>댓글 {allComments.length}개</CommentTitle>
      </CommentHeader>

      {/* 댓글 작성 폼 */}
      <CommentForm onSubmit={onCommentSubmit}>
        <CommentTextarea
          placeholder="댓글을 입력하세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <CommentSubmitButton type="submit" disabled={!commentText.trim()}>
          등록
        </CommentSubmitButton>
      </CommentForm>

      {/* 댓글 목록 */}
      <CommentList>
        {comments.length === 0 ? (
          <NoCommentsMessage>
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </NoCommentsMessage>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentAuthorInfo>
                <ProfileImage src="/ic_profile.svg" alt="Profile" />
                <CommentAuthorName>
                  {comment.author?.nickname || "알 수 없는 사용자"}
                </CommentAuthorName>
                <CommentDate>
                  {comment.createdAt
                    ? new Date(comment.createdAt)
                        .toLocaleDateString()
                        .replace(/\./g, ". ")
                    : "날짜 없음"}
                </CommentDate>
              </CommentAuthorInfo>

              {editingCommentId === comment.id ? (
                <CommentEditForm>
                  <CommentTextarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    required
                  />
                  <CommentEditButtons>
                    <CommentEditButton
                      type="button"
                      onClick={() => onEditSubmit(comment.id)}
                      disabled={!editText.trim()}
                    >
                      저장
                    </CommentEditButton>
                    <CommentCancelButton type="button" onClick={onEditCancel}>
                      취소
                    </CommentCancelButton>
                  </CommentEditButtons>
                </CommentEditForm>
              ) : (
                <>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentActionButtons>
                    <CommentActionButton onClick={() => onEditStart(comment)}>
                      수정
                    </CommentActionButton>
                    <CommentActionButton
                      onClick={() => onCommentDelete(comment.id)}
                    >
                      삭제
                    </CommentActionButton>
                  </CommentActionButtons>
                </>
              )}
            </CommentItem>
          ))
        )}
      </CommentList>

      {/* 댓글 페이지네이션 */}
      <PaginationWrapper>
        <Pagination
          currentPage={commentPage}
          totalPages={Math.max(1, totalCommentPages)}
          hasNext={hasNextCommentPage}
          hasPrev={hasPrevCommentPage}
          onPageChange={onPageChange}
        />
      </PaginationWrapper>
    </CommentSection>
  );
};

// 스타일 컴포넌트 정의
const CommentSection = styled.section`
  padding: 2rem;
`;

const CommentHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3692ff;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const CommentSubmitButton = styled.button`
  align-self: flex-end;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
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

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
  }
`;

const CommentAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const CommentAuthorName = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const CommentActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: #111827;
    text-decoration: underline;
  }
`;

const CommentEditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentEditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const CommentEditButton = styled.button`
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const CommentCancelButton = styled.button`
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
`;

const NoCommentsMessage = styled.div`
  padding: 2rem 0;
  text-align: center;
  color: #6b7280;
  font-style: italic;
`;

const PaginationWrapper = styled.div`
  margin-top: 2rem;
`;

export default ArticleComments;
