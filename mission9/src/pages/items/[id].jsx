import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductDetail,
  deleteProduct,
  toggleProductFavorite,
  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
  checkUserPermission,
} from "@/services/productService";
import { hasToken, getUserInfo } from "@/services/authService";
import Loading from "@/components/common/Loading";
import DetailContainer from "@/components/common/DetailContainer";
import DetailHeader from "@/components/common/DetailHeader";
import DetailContent from "@/components/common/DetailContent";
import CommentSection from "@/components/common/CommentSection";
import LikeButton from "@/components/common/LikeButton";
import Modal from "@/components/common/Modal";
import styled from "@emotion/styled";

/**
 * 상품 상세 페이지 컴포넌트
 */
const ProductDetailPage = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const queryClient = useQueryClient();

  // 댓글 관련 상태
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // 댓글 수정/삭제 관련 모달 상태
  const [isCommentEditModalOpen, setIsCommentEditModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentModalMessage, setCommentModalMessage] = useState("");

  const commentsPerPage = 5; // 페이지당 댓글 수

  // 로그인 여부 확인
  const isLoggedIn = typeof window !== "undefined" ? hasToken() : false;

  // 현재 사용자 정보 쿼리
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5, // 5분 동안 신선한 상태로 유지
    retry: false,
  });

  // 상품 상세 정보 조회 쿼리
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
    error: productErrorDetails,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["product", productId, isLoggedIn],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onSuccess: (data) => {
      console.log("상품 상세 조회 성공:", data);
      console.log("좋아요 상태:", {
        isFavorite: data.isFavorite,
        favoriteCount: data.favoriteCount,
      });
    },
  });

  // 상품 좋아요 상태
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // 상품 데이터가 로드되면 좋아요 상태와 사용자 정보 로깅
  useEffect(() => {
    if (product) {
      const serverIsFavorite = product.isFavorite === true;
      console.log("서버에서 받은 좋아요 상태:", {
        isFavorite: serverIsFavorite,
        favoriteCount: product.favoriteCount || 0,
        rawValue: product.isFavorite,
      });

      // 상태 업데이트
      setIsFavorite(serverIsFavorite);
      setFavoriteCount(product.favoriteCount || 0);

      if (serverIsFavorite) {
        console.log(
          "💖 이 상품을 이미 좋아요 했습니다. 핑크색 하트로 표시됩니다."
        );
      } else {
        console.log(
          "🤍 이 상품을 아직 좋아요하지 않았습니다. 기본 하트로 표시됩니다."
        );
      }

      console.log("상품 작성자 정보:", product.author);
      console.log("현재 사용자 정보:", userData);
    }
  }, [product, userData]);

  // 로그인 상태 변경 시 쿼리 재실행
  useEffect(() => {
    if (isLoggedIn && productId) {
      console.log("로그인 상태 변경 감지 - 상품 정보 다시 조회");
      refetchProduct();
    }
  }, [isLoggedIn, productId, refetchProduct]);

  // 댓글 조회 쿼리
  const {
    data: commentsData,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["productComments", productId],
    queryFn: () => getProductComments(productId, 100), // 댓글 100개 로드
    enabled: !!productId,
    staleTime: 1000 * 60, // 1분 동안 데이터를 신선한 상태로 유지
  });

  // 현재 사용자 ID 가져오기
  const currentUserId = userData?.id;

  // 댓글 목록 상태 - 현재 사용자 ID를 이용해 isMine 속성 설정
  const [commentPage, setCommentPage] = useState(1);
  const rawComments = commentsData?.comments || [];

  // 댓글 데이터에 isMine 속성 추가
  const comments = React.useMemo(() => {
    console.log("현재 사용자 ID:", currentUserId);
    console.log("원본 댓글 데이터:", rawComments);

    return rawComments.map((comment) => {
      const isCommentMine =
        !!currentUserId &&
        (comment.userId === currentUserId ||
          comment.author?.id === currentUserId);

      console.log(`댓글 ID ${comment.id} 소유권:`, {
        commentUserId: comment.userId,
        commentAuthorId: comment.author?.id,
        currentUserId,
        isCommentMine,
      });

          return {
            ...comment,
        isMine: isCommentMine,
      };
    });
  }, [rawComments, currentUserId]);

  const totalComments = comments.length;
  const paginatedComments = comments.slice(
    (commentPage - 1) * commentsPerPage,
    commentPage * commentsPerPage
  );

  // 페이지 변경 핸들러
  const handleCommentPageChange = (page) => {
    setCommentPage(page);
  };

  // 상품 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setModalMessage("상품이 삭제되었습니다.");
      setIsModalOpen(true);
    },
    onError: (error) => {
      setModalMessage(`상품 삭제 실패: ${error.message}`);
      setIsModalOpen(true);
    },
  });

  // 상품 삭제 핸들러
  const handleDelete = async () => {
    if (!product) return;

    setIsConfirmModalOpen(true);
  };

  // 삭제 확인 핸들러
  const confirmDelete = () => {
    setIsConfirmModalOpen(false);
    deleteMutation.mutate(productId);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);

    // 삭제 성공 후 목록 페이지로 이동
    if (modalMessage === "상품이 삭제되었습니다.") {
      router.push("/items");
    }
  };

  // 좋아요 토글 뮤테이션
  const likeMutation = useMutation({
    mutationFn: ({ productId, willLike }) =>
      toggleProductFavorite(productId, willLike),
    onSuccess: (data) => {
      // API 응답에서 상태 업데이트
      console.log("좋아요 토글 성공 데이터:", data);
      setIsFavorite(data.isFavorite);
      setFavoriteCount(data.favoriteCount);

      // 상품 상태 갱신
      refetchProduct();

      // 좋아요 상태에 따라 디버깅 메시지 출력
      if (data.isFavorite) {
        console.log("💖 좋아요가 활성화되었습니다.");
      } else {
        console.log("🤍 좋아요가 비활성화되었습니다.");
      }
    },
    onError: (error) => {
      console.error("좋아요 처리 실패:", error);
      alert(`좋아요 처리 실패: ${error.message}`);
      // 실패 시 상태 되돌리기
      setIsFavorite((prev) => !prev);
    },
  });

  // 좋아요 핸들러
  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      router.push("/login");
      return;
    }

    // 현재 좋아요 상태 확인
    const willLike = !isFavorite;

    // 낙관적 UI 업데이트
    setIsFavorite(willLike);
    // 좋아요 토글에 따라 미리 카운트 업데이트
    setFavoriteCount((prev) => (willLike ? prev + 1 : prev - 1));

    try {
      // 뮤테이션 실행
      const result = await likeMutation.mutateAsync({
        productId,
        willLike,
      });

      // 성공 시 상태 정확히 업데이트
      console.log(`좋아요 ${willLike ? "추가" : "취소"} 성공:`, result);

      // 혹시 API 응답이 예상과 다를 경우 동기화
      if (result.isFavorite !== willLike) {
        console.log("API 응답의 좋아요 상태가 예상과 다름:", result.isFavorite);
        setIsFavorite(result.isFavorite);
      }

      // 좋아요 수 업데이트
      setFavoriteCount(result.favoriteCount);
    } catch (error) {
      // 오류 발생 시 처리
      console.error("좋아요 처리 실패:", error);

      const errorMessage = error.message || "";

      // "이미 찜한 상품입니다" 오류인 경우 자동으로 좋아요 취소 시도
      if (errorMessage.includes("이미 찜한 상품입니다")) {
        console.log(
          "좋아요가 이미 되어있는 상태입니다. 좋아요 취소를 시도합니다."
        );

        // 서버는 이미 좋아요 상태로 인식하고 있으므로, 상태 동기화 후 취소 시도
        setIsFavorite(true);

        try {
          // 좋아요 취소 시도
          const cancelResult = await likeMutation.mutateAsync({
            productId,
            willLike: false, // 취소 요청
          });

          console.log("좋아요 취소 성공:", cancelResult);
          setIsFavorite(false);
          setFavoriteCount(cancelResult.favoriteCount);
          return; // 성공적으로 처리되었으므로 여기서 종료
        } catch (cancelError) {
          console.error("좋아요 취소 시도 실패:", cancelError);
          // 취소 시도마저 실패한 경우 원래 상태로 복원
          setIsFavorite(true);
          alert(`좋아요 취소 실패: ${cancelError.message}`);
        }
      } else {
        // 다른 오류인 경우 이전 상태로 복원
        alert(`좋아요 ${willLike ? "추가" : "취소"} 실패: ${error.message}`);
        setIsFavorite(!willLike);
        setFavoriteCount((prev) => (willLike ? prev - 1 : prev + 1));
      }
    }
  };

  // 댓글 작성 뮤테이션
  const commentMutation = useMutation({
    mutationFn: createProductComment,
    onSuccess: () => {
      setCommentText("");
      refetchComments();
    },
    onError: (error) => {
      alert(`댓글 작성 실패: ${error.message}`);
    },
  });

  // 댓글 수정 뮤테이션
  const updateCommentMutation = useMutation({
    mutationFn: updateProductComment,
    onSuccess: () => {
      setEditingCommentId(null);
      setEditText("");
      refetchComments();
      // 성공 메시지 모달 표시
      setCommentModalMessage("댓글이 수정되었습니다.");
      setIsCommentEditModalOpen(true);
    },
    onError: (error) => {
      // 에러 메시지 모달 표시
      setCommentModalMessage(`댓글 수정 실패: ${error.message}`);
      setIsCommentEditModalOpen(true);
    },
  });

  // 댓글 삭제 뮤테이션
  const deleteCommentMutation = useMutation({
    mutationFn: deleteProductComment,
    onSuccess: () => {
      refetchComments();
      // 성공 메시지 모달 표시
      setCommentModalMessage("댓글이 삭제되었습니다.");
      setIsCommentEditModalOpen(true);
    },
    onError: (error) => {
      // 에러 메시지 모달 표시
      setCommentModalMessage(`댓글 삭제 실패: ${error.message}`);
      setIsCommentEditModalOpen(true);
    },
  });

  // 댓글 작성 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      router.push("/login");
      return;
    }

    if (!commentText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    commentMutation.mutate({
      productId,
        content: commentText,
      });
  };

  // 댓글 수정 시작 핸들러
  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
  };

  // 댓글 수정 취소 핸들러
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  // 댓글 수정 제출 핸들러
  const handleEditSubmit = async (commentId) => {
    if (!editText.trim()) {
      setCommentModalMessage("댓글 내용을 입력해주세요.");
      setIsCommentEditModalOpen(true);
      return;
    }

    updateCommentMutation.mutate({
      commentId,
        content: editText,
      });
  };

  // 댓글 삭제 핸들러
  const handleCommentDelete = async (commentId) => {
    setSelectedCommentId(commentId);
    setIsCommentDeleteModalOpen(true);
  };

  // 댓글 삭제 확인 핸들러
  const confirmCommentDelete = () => {
    setIsCommentDeleteModalOpen(false);
    if (selectedCommentId) {
      deleteCommentMutation.mutate({ commentId: selectedCommentId });
    }
  };

  // 댓글 모달 닫기 핸들러
  const closeCommentModal = () => {
    setIsCommentEditModalOpen(false);
    setSelectedCommentId(null);
  };

  // 날짜 포맷팅 함수
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

  // 로딩 중 표시
  if (productLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  // 에러 표시
  if (productError) {
    return (
      <ErrorContainer>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorText>
          {productErrorDetails?.message ||
            "상품 정보를 불러오는 중 오류가 발생했습니다."}
        </ErrorText>
        <RetryButton onClick={() => router.reload()}>다시 시도</RetryButton>
      </ErrorContainer>
    );
  }

  // 상품이 없는 경우
  if (!product) {
    return (
      <ErrorContainer>
        <ErrorText>상품 정보를 찾을 수 없습니다.</ErrorText>
        <RetryButton onClick={() => router.push("/items")}>
          상품 목록으로
        </RetryButton>
      </ErrorContainer>
    );
  }

  // 사용자 권한 확인 (상품 작성자인지)
  const isAuthor = checkUserPermission(product.userId);

  return (
    <>
      <DetailContainer>
      <DetailHeader
          title={product.title}
          price={product.price}
        createdAt={product.createdAt}
          updatedAt={product.updatedAt}
          viewCount={product.viewCount}
          author={product.author}
          onEdit={() => router.push(`/items/edit?id=${productId}`)}
        onDelete={handleDelete}
          hasPermission={isAuthor}
      />

      <DetailContent
          content={product.content}
        images={product.images || []}
        tags={product.tags || []}
        />

        {/* 사용자 정보 및 좋아요 섹션 */}
        <UserSection>
          <UserInfo>
            <ProfileImage
              src={userData?.image || "/ic_profile.svg"}
              alt={`${product.author?.nickname || "사용자"} 프로필 이미지`}
            />
            <UserDetails>
              <UserName>{product.author?.nickname}</UserName>
              <PostDate>{formatDate(product.createdAt)}</PostDate>
            </UserDetails>
          </UserInfo>

          <LikeButton
            isLiked={isFavorite}
            onClick={handleLike}
            likeCount={favoriteCount}
            isLoading={likeMutation.isPending}
          />
        </UserSection>

        <CommentSection
          comments={paginatedComments}
          totalComments={totalComments}
          commentsPerPage={commentsPerPage}
          currentPage={commentPage}
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
          isLoading={
            commentsLoading ||
            commentMutation.isPending ||
            deleteCommentMutation.isPending ||
            updateCommentMutation.isPending
          }
          isLoggedIn={isLoggedIn}
        />
      </DetailContainer>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        message="정말로 상품을 삭제하시겠어요?"
        isConfirmModal={true}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        confirmText="삭제"
        cancelText="취소"
        isDelete={true}
      />

      {/* 결과 알림 모달 */}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        buttonText="확인"
      />

      {/* 댓글 삭제 확인 모달 */}
      <Modal
        isOpen={isCommentDeleteModalOpen}
        message="정말로 이 댓글을 삭제하시겠어요?"
        isConfirmModal={true}
        onClose={() => setIsCommentDeleteModalOpen(false)}
        onConfirm={confirmCommentDelete}
        confirmText="삭제"
        cancelText="취소"
        isDelete={true}
      />

      {/* 댓글 수정/삭제 결과 모달 */}
      <Modal
        isOpen={isCommentEditModalOpen}
        message={commentModalMessage}
        onClose={closeCommentModal}
        buttonText="확인"
      />
    </>
  );
};

export default ProductDetailPage;

// 스타일 컴포넌트
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #ef4444;
`;

const ErrorIcon = styled.span`
  margin-right: 8px;
  font-size: 24px;
`;

const ErrorText = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a75cc;
  }
`;

// 사용자 정보 및 좋아요 섹션
const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #111827;
  font-size: 1rem;
`;

const PostDate = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 2px;
`;

// 서버 사이드 렌더링을 위한 getServerSideProps
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    // 서버 사이드에서 상품 데이터 미리 가져오기
    const product = await getProductDetail(id);

    return {
      props: {
        initialProduct: product,
      },
    };
  } catch (error) {
    console.error("상품 상세 정보 조회 실패:", error);
    return {
      props: {
        initialProduct: null,
      },
    };
  }
}
