import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import KebabMenu from "./KebabMenu";

/* 기능: 댓글 섹션 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.comments - 댓글 목록
 * @param {number} props.totalComments - 총 댓글 수
 * @param {number} props.currentPage - 현재 페이지
 * @param {number} props.commentsPerPage - 페이지당 댓글 수
 * @param {Function} props.onPageChange - 페이지 변경 핸들러
 * @param {string} props.commentText - 댓글 입력 텍스트
 * @param {Function} props.setCommentText - 댓글 텍스트 설정 함수
 * @param {Function} props.onCommentSubmit - 댓글 제출 핸들러
 * @param {string|number} props.editingCommentId - 현재 편집 중인 댓글 ID
 * @param {string} props.editText - 편집 중인 댓글 텍스트
 * @param {Function} props.setEditText - 편집 텍스트 설정 함수
 * @param {Function} props.onEditStart - 편집 시작 핸들러
 * @param {Function} props.onEditCancel - 편집 취소 핸들러
 * @param {Function} props.onEditSubmit - 편집 제출 핸들러
 * @param {Function} props.onCommentDelete - 댓글 삭제 핸들러
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {boolean} props.isLoggedIn - 로그인 상태
 */
const CommentSection = ({
  comments = [],
  totalComments = 0,
  currentPage = 1,
  commentsPerPage = 5,
  onPageChange,
  commentText = "",
  setCommentText,
  onCommentSubmit,
  editingCommentId = null,
  editText = "",
  setEditText,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  onCommentDelete,
  isLoading = false,
  isLoggedIn = false,
}) => {
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  /* 로직: 날짜 포맷팅
   * @param {string} dateString - ISO 형식의 날짜 문자열
   * @returns {string} 포맷팅된 날짜 문자열 (YYYY.MM.DD HH:mm)
   */
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return "";
    }
  };

  return (
    <CommentsContainer>
      <CommentsHeader>
        <CommentsTitle>댓글 {totalComments}개</CommentsTitle>
      </CommentsHeader>

      {/* 로직: 댓글 작성 폼 */}
      {isLoggedIn ? (
        <CommentForm onSubmit={onCommentSubmit}>
          <CommentTextAreaContainer>
            <CommentTextArea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 작성해 주세요"
              disabled={isLoading}
            />
          </CommentTextAreaContainer>
          <SubmitButtonContainer>
            <SubmitButton
              type="submit"
              disabled={isLoading || !commentText.trim()}
            >
              등록
            </SubmitButton>
          </SubmitButtonContainer>
        </CommentForm>
      ) : (
        <LoginPrompt>댓글을 작성하려면 로그인이 필요합니다.</LoginPrompt>
      )}

      {/* 로직: 댓글 목록 */}
      {comments.length > 0 ? (
        <CommentsList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              {editingCommentId === comment.id ? (
                /* 로직: 댓글 수정 폼 */
                <EditForm>
                  <CommentTextArea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    disabled={isLoading}
                  />
                  <ButtonGroup>
                    <CancelButton
                      type="button"
                      onClick={onEditCancel}
                      disabled={isLoading}
                    >
                      취소
                    </CancelButton>
                    <SubmitButton
                      type="button"
                      onClick={() => onEditSubmit(comment.id)}
                      disabled={isLoading || !editText.trim()}
                    >
                      수정
                    </SubmitButton>
                  </ButtonGroup>
                </EditForm>
              ) : (
                /* 로직: 댓글 표시 */
                <>
                  <CommentHeader>
                    <UserInfo>
                      <UserImageWrapper>
                        <Image
                          src={comment.author?.image || "/ic_profile.svg"}
                          alt="프로필"
                          width={32}
                          height={32}
                          onError={(e) => {
                            e.target.src = "/ic_profile.svg";
                          }}
                          style={{ objectFit: "cover" }}
                          unoptimized={comment.author?.image?.startsWith(
                            "http"
                          )}
                        />
                      </UserImageWrapper>
                      <UserInfoText>
                        <UserName>
                          {comment.author?.nickname || "익명"}
                        </UserName>
                        <CommentDate>
                          {formatDate(comment.createdAt)}
                        </CommentDate>
                      </UserInfoText>
                    </UserInfo>

                    {comment.isMine && (
                      <ActionButtons>
                        <KebabMenu
                          onEdit={() => onEditStart(comment)}
                          onDelete={() => onCommentDelete(comment.id)}
                          hasPermission={comment.isMine}
                        />
                      </ActionButtons>
                    )}
                  </CommentHeader>
                  <CommentText>{comment.content}</CommentText>
                </>
              )}
            </CommentItem>
          ))}
        </CommentsList>
      ) : (
        <EmptyComments>등록된 댓글이 없습니다.</EmptyComments>
      )}

      {/* 로직: 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PageButton
              key={index}
              onClick={() => onPageChange(index + 1)}
              active={currentPage === index + 1}
              disabled={isLoading}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </CommentsContainer>
  );
};

/* 스타일: 컨테이너 및 레이아웃 */
const CommentsContainer = styled.div`
  margin-top: 2rem;
  padding: 0 2rem 2rem;
`;

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CommentsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

/* 스타일: 댓글 작성 폼 */
const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommentTextAreaContainer = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: none;
  resize: vertical;
  font-size: 0.875rem;
  line-height: 1.25rem;
  &:focus {
    outline: none;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

/* 스타일: 버튼 */
const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

/* 스타일: 댓글 목록 */
const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #111827;
`;

const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #374151;
  white-space: pre-wrap;
`;

/* 스타일: 편집 폼 */
const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

/* 스타일: 기타 */
const LoginPrompt = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 2rem;
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.active ? "#3b82f6" : "#d1d5db")};
  background-color: ${(props) => (props.active ? "#3b82f6" : "white")};
  color: ${(props) => (props.active ? "white" : "#4b5563")};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export default CommentSection;
