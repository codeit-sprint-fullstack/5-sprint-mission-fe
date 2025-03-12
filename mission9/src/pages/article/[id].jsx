import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import CommentSection from "@/components/common/CommentSection";
import DetailContainer from "@/components/common/DetailContainer";
import DetailHeader from "@/components/common/DetailHeader";
import DetailContent from "@/components/common/DetailContent";
import LikeButton from "@/components/common/LikeButton";
import DetailNavigationButton from "@/components/common/DetailNavigationButton";
import styled from "@emotion/styled";

/**
 * 정적 경로 생성을 위한 함수
 */
export async function getStaticPaths() {
  try {
    // 초기에는 최근 게시글 20개의 경로만 미리 생성
    const { articles } = await getArticles({ page: 1, limit: 20 });
    const paths = articles.map((article) => ({
      params: { id: article.id.toString() },
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
    // params.id가 문자열임을 확인하고, 필요한 경우 변환
    const articleId = params.id;
    console.log(
      "Article ID in getStaticProps:",
      articleId,
      "Type:",
      typeof articleId
    );

    const article = await getArticleById(articleId, true); // 항상 최신 데이터 사용

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
  const [article, setArticle] = useState(initialArticle);
  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const commentsPerPage = 5; // 페이지당 댓글 수

  // 초기 데이터 로드
  useEffect(() => {
    if (router.isReady) {
      // 동적 경로에서 id 가져오기
      const { id } = router.query;

      if (id) {
        const fetchArticle = async () => {
          try {
            setLoading(true);
            console.log(
              "동적 라우트에서 게시글 데이터 로딩:",
              id,
              "Type:",
              typeof id
            );

            // 이미 article이 있고 id가 같으면 다시 로드하지 않음
            if (article && article.id === parseInt(id)) {
              console.log("게시글 이미 로드됨:", article.id);
              // 댓글만 다시 로드
              await loadComments(article.id);
              return;
            }

            const data = await getArticleById(id);
            console.log("가져온 게시글 데이터:", data);

            if (data) {
              setArticle(data);
              // 댓글 로드
              await loadComments(data.id);
            } else {
              console.error("게시글 데이터가 없습니다");
              setArticle(null);
            }
          } catch (error) {
            console.error("게시글 로드 오류:", error);
            setArticle(null);
          } finally {
            setLoading(false);
          }
        };

        fetchArticle();
      }
    }
  }, [router.isReady, router.query.id]);

  // 댓글 로드 함수
  const loadComments = async (articleId) => {
    try {
      console.log("댓글 로드 시작:", articleId);
      const fetchedComments = await getCommentsByArticleId(articleId);
      console.log("가져온 댓글 데이터:", fetchedComments);

      // 댓글이 없는 경우 빈 배열 설정
      const commentsArray = Array.isArray(fetchedComments)
        ? fetchedComments
        : [];

      setAllComments(commentsArray);

      // 현재 페이지에 표시할 댓글 설정
      const startIndex = (commentPage - 1) * commentsPerPage;
      const endIndex = startIndex + commentsPerPage;
      setComments(commentsArray.slice(startIndex, endIndex));
    } catch (error) {
      console.error("댓글 로드 오류:", error);
      setAllComments([]);
      setComments([]);
    }
  };

  // 댓글 페이지 변경 처리
  const handleCommentPageChange = (page) => {
    setCommentPage(page);
    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setComments(allComments.slice(startIndex, endIndex));
  };

  // 게시글 삭제 처리
  const handleDelete = async () => {
    if (!article?.id) {
      console.error("게시글 ID가 없어 삭제할 수 없습니다.");
      alert("게시글 정보를 불러올 수 없어 삭제할 수 없습니다.");
      return;
    }

    // 확인 대화상자
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setLoading(true);
      console.log("게시글 삭제 시도:", article.id);
      await deleteArticle(article.id);
      alert("게시글이 삭제되었습니다.");
      router.push("/article");
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
      alert(`게시글 삭제 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 좋아요 처리
  const handleLike = async () => {
    if (!article?.id) {
      console.error("게시글 ID가 없어 좋아요를 처리할 수 없습니다.");
      alert("게시글 정보를 불러올 수 없어 좋아요를 처리할 수 없습니다.");
      return;
    }

    try {
      setLoading(true);
      console.log("Current like count:", article?.likeCount || 0);

      // 현재 상태 저장
      const currentLiked = article?.isLiked || false;
      const currentCount = article?.likeCount || 0;

      // UI 먼저 업데이트 (낙관적 UI 업데이트)
      setArticle((prevArticle) => ({
        ...prevArticle,
        isLiked: !currentLiked,
        likeCount: !currentLiked
          ? currentCount + 1
          : Math.max(0, currentCount - 1),
      }));

      const response = await incrementArticleLike(article.id);
      console.log("좋아요 응답:", response);

      if (response) {
        // 서버 응답에 따라 상태 업데이트
        setArticle((prevArticle) => ({
          ...prevArticle,
          likeCount:
            response.likeCount !== undefined
              ? response.likeCount
              : prevArticle.likeCount,
          isLiked:
            response.isLiked !== undefined
              ? response.isLiked
              : !prevArticle.isLiked,
        }));
        console.log("좋아요 상태 업데이트 완료:", response.isLiked);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      // 오류 발생 시 이전 상태로 복원
      setArticle((prevArticle) => ({
        ...prevArticle,
        isLiked: prevArticle.originalIsLiked || false,
        likeCount: prevArticle.originalLikeCount || prevArticle.likeCount,
      }));
      alert("좋아요 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 댓글 작성 제출
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // 댓글 내용이 비어있으면 제출하지 않음
    if (!commentText.trim()) {
      return;
    }

    try {
      setLoading(true);
      console.log("댓글 작성 시도:", {
        articleId: article.id,
        content: commentText,
      });

      const newComment = await createComment({
        articleId: article.id,
        content: commentText,
      });

      console.log("새 댓글 생성 응답:", newComment);

      if (newComment) {
        // 댓글 목록 다시 로드
        await loadComments(article.id);
        // 댓글 입력 필드 초기화
        setCommentText("");
      }
    } catch (error) {
      console.error("댓글 작성 오류:", error);
      alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
    // 수정 내용이 비어있으면 제출하지 않음
    if (!editText.trim()) {
      return;
    }

    try {
      setLoading(true);
      console.log("댓글 수정 시도:", {
        articleId: article.id,
        commentId,
        content: editText,
      });

      const updatedComment = await updateComment({
        articleId: article.id,
        commentId: commentId,
        content: editText,
      });

      console.log("댓글 수정 응답:", updatedComment);

      if (updatedComment) {
        // 댓글 목록 다시 로드
        await loadComments(article.id);
        // 수정 모드 종료
        setEditingCommentId(null);
        setEditText("");
      }
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      alert("댓글 수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 댓글 삭제
  const handleCommentDelete = async (commentId) => {
    // 확인 대화상자
    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setLoading(true);
      console.log("댓글 삭제 시도:", { articleId: article.id, commentId });

      await deleteComment({
        articleId: article.id,
        commentId,
      });

      console.log("댓글 삭제 완료");

      // 댓글 목록 다시 로드
      await loadComments(article.id);

      // 현재 페이지에 댓글이 없어서 이전 페이지로 가야 하는 경우
      if (comments.length === 1 && commentPage > 1) {
        handleCommentPageChange(commentPage - 1);
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert("댓글 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 게시글 수정
  const handleEdit = () => {
    if (article?.id) {
      router.push(`/article/write?id=${article.id}`);
    } else {
      console.error("게시글 ID가 없어 수정 페이지로 이동할 수 없습니다.");
      alert("게시글 정보를 불러올 수 없어 수정할 수 없습니다.");
    }
  };

  if (loading) return <Loading />;

  // 페이지네이션 정보 계산
  const totalCommentPages = Math.ceil(allComments.length / commentsPerPage);
  const hasNextCommentPage = commentPage < totalCommentPages;
  const hasPrevCommentPage = commentPage > 1;

  return (
    <DetailContainer type="article">
      <DetailHeader
        title={article?.title}
        author={article?.author}
        createdAt={article?.createdAt}
        showButtons={true}
        hasPermission={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        type="article"
      />

      <DetailContent
        imageUrl={article?.imageUrl || article?.image}
        images={article?.images || []}
        content={article?.content}
        price={article?.price}
        createdAt={article?.createdAt}
        favoriteCount={article?.likeCount || 0}
        tags={article?.tags || []}
        author={article?.author || { nickname: "익명" }}
        isLiked={article?.isLiked || false}
        onLikeClick={handleLike}
        type="article"
      />

      <CommentSection
        comments={comments}
        totalComments={allComments.length}
        currentPage={commentPage}
        commentsPerPage={commentsPerPage}
        onPageChange={handleCommentPageChange}
        commentText={commentText}
        setCommentText={setCommentText}
        onCommentSubmit={handleCommentSubmit}
        editingCommentId={editingCommentId}
        editText={editText}
        setEditText={setEditText}
        onEditStart={handleEditStart}
        onEditCancel={handleEditCancel}
        onEditSubmit={handleEditSubmit}
        onCommentDelete={handleCommentDelete}
        isLoading={loading}
        isLoggedIn={true}
      />

      <DetailNavigationButton
        href="/article"
        text="목록으로 돌아가기"
        type="article"
      />
    </DetailContainer>
  );
};

export default ArticlePage;
