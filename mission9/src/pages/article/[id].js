import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import {
  getArticleById,
  deleteArticle,
  getArticles,
  incrementArticleLike,
  getCommentsByArticleId,
  createComment,
  updateComment,
  deleteComment,
} from "@/services/articleService";
import Loading from "@/components/common/Loading";
import ArticleComments from "@/components/article/ArticleComments";

/**
 * 정적 경로 생성을 위한 함수
 */
export async function getStaticPaths() {
  try {
    // 초기에는 최근 게시글 20개의 경로만 미리 생성
    const { articles } = await getArticles({ page: 1, limit: 20 });
    const paths = articles.map((article) => ({
      params: { id: article.id },
    }));

    return {
      paths,
      // fallback: true로 설정하여 없는 경로에 대해서도 동적으로 페이지 생성
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
}

/**
 * 정적 페이지 생성을 위한 데이터 페칭 함수
 */
export async function getStaticProps({ params }) {
  try {
    const article = await getArticleById(params.id, true); // 항상 최신 데이터 사용

    return {
      props: {
        article,
        error: null,
      },
      // 10초마다 페이지 재생성 (기존 30초에서 더 짧게 조정)
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        article: null,
        error: error.message,
      },
      revalidate: 10,
    };
  }
}

/**
 * 게시글 상세 페이지 컴포넌트
 */
const ArticlePage = ({ article: initialArticle, error: initialError }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(initialArticle);
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  // 댓글 페이지네이션 상태
  const [commentPage, setCommentPage] = useState(1);
  const commentsPerPage = 5;

  // 게시글 최신 데이터 로딩 (쿠키 또는 query 파라미터 확인)
  useEffect(() => {
    const loadFreshArticleData = async () => {
      if (router.isReady && article?.id) {
        // 쿠키 또는 query 파라미터를 확인하여 강제 새로고침이 필요한지 확인
        const forceRefreshCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("forceRefresh="));
        const needRefresh =
          forceRefreshCookie || router.query.refresh === "true";

        if (needRefresh) {
          try {
            setLoading(true);
            console.log("게시글 데이터 새로고침 중...");
            const freshArticle = await getArticleById(article.id, true); // skipCache = true
            setArticle(freshArticle);
            console.log("게시글 데이터 새로고침 완료:", freshArticle.title);

            // 쿠키 삭제
            document.cookie = "forceRefresh=; path=/; max-age=0";
          } catch (error) {
            console.error("게시글 데이터 새로고침 오류:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    loadFreshArticleData();
  }, [router.isReady, router.query, article?.id]);

  // 게시글 데이터와 댓글 데이터 로딩
  useEffect(() => {
    if (article?.id) {
      loadComments(article.id);
    }
  }, [article?.id]);

  // 댓글 페이지네이션 처리
  useEffect(() => {
    if (allComments.length) {
      const startIndex = (commentPage - 1) * commentsPerPage;
      const endIndex = startIndex + commentsPerPage;
      setComments(allComments.slice(startIndex, endIndex));
    }
  }, [commentPage, allComments]);

  // 댓글 목록 로딩
  const loadComments = async (articleId) => {
    try {
      setLoading(true);
      const fetchedComments = await getCommentsByArticleId(articleId);
      setAllComments(fetchedComments);

      // 첫 페이지의 댓글만 표시
      const startIndex = 0;
      const endIndex = commentsPerPage;
      setComments(fetchedComments.slice(startIndex, endIndex));

      // 페이지 초기화
      setCommentPage(1);
    } catch (error) {
      console.error("댓글 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 페이지 변경 핸들러
  const handleCommentPageChange = (page) => {
    setCommentPage(page);
    window.scrollTo({
      top: document.getElementById("comments-section").offsetTop - 100,
      behavior: "smooth",
    });
  };

  // fallback 상태 처리
  if (router.isFallback) {
    return <Loading />;
  }

  // 에러 상태 처리
  if (initialError) {
    return <ErrorMessage>에러 발생: {initialError}</ErrorMessage>;
  }

  // 게시글이 없는 경우 처리
  if (!article) {
    return <ErrorMessage>게시글을 찾을 수 없습니다.</ErrorMessage>;
  }

  // 게시글 삭제 처리
  const handleDelete = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      setLoading(true);
      console.log("게시글 삭제 시작:", article.id);

      await deleteArticle(article.id);

      console.log("게시글 삭제 완료, 목록 페이지로 이동");
      // router.push 대신 window.location을 사용하여 새로고침이 되도록 변경
      window.location.href = "/article";
    } catch (err) {
      console.error("게시글 삭제 오류:", err);
      alert(`게시글 삭제에 실패했습니다: ${err.message || "알 수 없는 오류"}`);
    } finally {
      setLoading(false);
    }
  };

  // 좋아요 처리
  const handleLike = async () => {
    try {
      setLoading(true);
      console.log("Current like count:", article.likes);

      // 좋아요 버튼 클릭 시 쿠키에 상태를 저장 (서버 사이드에서 인식하기 위해)
      document.cookie = `articleLiked=true; path=/`;
      document.cookie = `likedArticleId=${article.id}; path=/`;

      // localStorage에도 저장 (클라이언트 측 호환성 유지)
      if (typeof window !== "undefined") {
        localStorage.setItem("articleLiked", "true");
        localStorage.setItem("likedArticleId", article.id);
      }

      const response = await incrementArticleLike(article.id);

      if (response) {
        // 응답에서 author 정보가 없으면 현재 article의 author 정보 유지
        if (!response.author && article.author) {
          response.author = article.author;
        }
        setArticle(response);
        console.log("Like count updated from API:", response.likes);
      } else {
        // API 응답이 없는 경우 에러 처리
        throw new Error("좋아요 처리 중 오류가 발생했습니다. 응답이 없습니다.");
      }
    } catch (error) {
      console.error("Error incrementing like:", error);
      // 에러 발생 시 사용자에게 알림
      alert(
        `좋아요를 처리할 수 없습니다: ${
          error.message || "알 수 없는 오류가 발생했습니다."
        }`
      );

      // 좋아요 상태 초기화
      document.cookie = "articleLiked=false; path=/; max-age=0";
      document.cookie = "likedArticleId=; path=/; max-age=0";

      if (typeof window !== "undefined") {
        localStorage.removeItem("articleLiked");
        localStorage.removeItem("likedArticleId");
      }
    } finally {
      setLoading(false);
    }
  };

  // 댓글 추가 처리
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      const newComment = await createComment({
        content: commentText,
        articleId: article.id,
      });

      setAllComments([newComment, ...allComments]);
      setCommentPage(1); // 새 댓글 작성 후 첫 페이지로 이동
      setCommentText("");
    } catch (error) {
      console.error("댓글 작성 오류:", error);
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 댓글 수정 시작
  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
  };

  // 댓글 수정 취소
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  // 댓글 수정 제출
  const handleEditSubmit = async (commentId) => {
    if (!editText.trim()) return;

    try {
      setLoading(true);
      console.log("댓글 수정 시도:", commentId, editText);

      const updatedComment = await updateComment(commentId, {
        content: editText,
      });

      console.log("수정된 댓글 응답:", updatedComment);

      setAllComments(
        allComments.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      alert(`댓글 수정에 실패했습니다: ${error.message || "알 수 없는 오류"}`);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 삭제 처리
  const handleCommentDelete = async (commentId) => {
    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) return;

    try {
      setLoading(true);
      console.log("댓글 삭제 시도:", commentId);

      await deleteComment(commentId);
      console.log("댓글 삭제 완료");

      const updatedComments = allComments.filter(
        (comment) => comment.id !== commentId
      );
      setAllComments(updatedComments);

      // 현재 페이지에 댓글이 없어지면 이전 페이지로 이동
      const currentPageComments = updatedComments.slice(
        (commentPage - 1) * commentsPerPage,
        commentPage * commentsPerPage
      );

      if (currentPageComments.length === 0 && commentPage > 1) {
        setCommentPage(commentPage - 1);
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert(`댓글 삭제에 실패했습니다: ${error.message || "알 수 없는 오류"}`);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 수정 페이지로 이동
  const handleEdit = () => router.push(`/article/write?id=${article.id}`);

  if (loading) return <Loading />;

  // 페이지네이션 정보 계산
  const totalCommentPages = Math.ceil(allComments.length / commentsPerPage);
  const hasNextCommentPage = commentPage < totalCommentPages;
  const hasPrevCommentPage = commentPage > 1;

  return (
    <Container>
      {/* 게시글 본문 */}
      <Article>
        <ArticleHeader>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleMeta>
            <AuthorInfo>
              <ProfileImage src="/ic_profile.svg" alt="Profile" />
              <AuthorName>{article.author.nickname}</AuthorName>
              <ArticleDate>
                {new Date(article.createdAt)
                  .toLocaleDateString()
                  .replace(/\./g, ". ")}
              </ArticleDate>
            </AuthorInfo>
            <ButtonGroup>
              <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </ButtonGroup>
          </ArticleMeta>
        </ArticleHeader>

        <ArticleImage
          src={article.imageUrl}
          alt={article.title}
          onError={(e) => {
            e.target.onerror = null; // 무한 루프 방지
            e.target.src = "/img_default.svg"; // 기본 이미지 경로
          }}
        />
        <ArticleContent>{article.content}</ArticleContent>

        {/* 좋아요 버튼 섹션 */}
        <LikeSection>
          <LikeButton onClick={handleLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <LikeCount>{article.likes}</LikeCount>
          </LikeButton>
        </LikeSection>

        {/* 댓글 컴포넌트 */}
        <ArticleComments
          allComments={allComments}
          comments={comments}
          commentPage={commentPage}
          totalCommentPages={totalCommentPages}
          hasNextCommentPage={hasNextCommentPage}
          hasPrevCommentPage={hasPrevCommentPage}
          commentText={commentText}
          editingCommentId={editingCommentId}
          editText={editText}
          setCommentText={setCommentText}
          setEditText={setEditText}
          onCommentSubmit={handleCommentSubmit}
          onEditStart={handleEditStart}
          onEditCancel={handleEditCancel}
          onEditSubmit={handleEditSubmit}
          onCommentDelete={handleCommentDelete}
          onPageChange={handleCommentPageChange}
        />
      </Article>

      {/* 뒤로가기 버튼 */}
      <BackButtonWrapper>
        <Link href="/article" passHref legacyBehavior>
          <BackButton>← 목록으로 돌아가기</BackButton>
        </Link>
      </BackButtonWrapper>
    </Container>
  );
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const BackButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

// 게시글 컨테이너
const Article = styled.article`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// 게시글 헤더 스타일
const ArticleHeader = styled.div`
  padding: 2rem;
  border-bottom: none;
`;

const ArticleTitle = styled.h1`
  font-size: 2rem;
  color: #111827;
  margin-bottom: 1rem;
`;

// 메타 정보 스타일
const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
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

const ArticleDate = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`;

// 버튼 그룹 스타일
const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const EditButton = styled(Button)`
  background-color: #3692ff;
  color: white;
  border: none;

  &:hover {
    background-color: #2a75cc;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ef4444;
  color: white;
  border: none;

  &:hover {
    background-color: #dc2626;
  }
`;

// 게시글 이미지 스타일 - 크기 줄임
const ArticleImage = styled.img`
  width: 100%;
  max-height: 400px; // 최대 높이 줄임
  object-fit: contain; // 이미지 비율 유지 (기존 cover에서 변경)
  margin: 0 auto;
  display: block;
`;

// 게시글 내용 스타일
const ArticleContent = styled.div`
  padding: 2rem;
  line-height: 1.8;
  color: #374151;
  font-size: 1.125rem;
`;

// 좋아요 섹션 스타일
const LikeSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  border-top: none;
  border-bottom: none;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  color: #3692ff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

const LikeCount = styled.span`
  font-size: 1rem;
`;

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #ef4444;
`;

export default ArticlePage;
