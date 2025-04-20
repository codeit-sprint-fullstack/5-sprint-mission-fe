import { api } from "./axios";

export interface Comment {
  id: string;
  user?: {
    nickname: string;
    image?: string;
    [key: string]: any;
  };
  userId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  comments: Comment[];
  writer: {
    id: string;
    image?: string;
    nickname: string;
  };
  nextCursor: string | null;
}

// 댓글 목록 조회
export const getCommentsByArticleId = async (
  articleId: string
): Promise<CommentsResponse> => {
  try {
    const response = await api.get<CommentsResponse>(
      `/api/articles/${articleId}/comments`
    );
    console.log("게시글 댓글 API 원본 응답:", response.data);

    // API 응답에 comments 필드가 없거나 배열이 아니면 처리
    if (!response.data.comments || !Array.isArray(response.data.comments)) {
      console.error("API 응답에 댓글 배열이 없습니다:", response.data);
      return {
        comments: [],
        writer: response.data.writer || { id: "", nickname: "" },
        nextCursor: null,
      };
    }

    // 댓글 목록 처리 - 이미 user 속성이 있으므로 추가 처리 필요 없음
    const result = {
      ...response.data,
      comments: response.data.comments,
    };

    console.log("처리된 게시글 댓글 데이터:", result);
    return result;
  } catch (error) {
    console.error("게시글 댓글 조회 오류:", error);
    // 오류 발생 시 빈 데이터 반환
    return {
      comments: [],
      writer: { id: "", nickname: "" },
      nextCursor: null,
    };
  }
};

// 댓글 작성
export const createComment = async (
  articleId: string,
  content: string
): Promise<void> => {
  await api.post(`/api/articles/${articleId}/comments`, { content });
};

// 댓글 수정 함수
export async function updateComment(
  commentId: string,
  content: string
): Promise<void> {
  await api.patch(`/api/comments/${commentId}`, {
    content,
  });
}

// 댓글 삭제 함수
export async function deleteComment(commentId: string): Promise<void> {
  await api.delete(`/api/comments/${commentId}`);
}
