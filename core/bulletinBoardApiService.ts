import { AxiosResponse } from "axios";
import { apiClientList } from "./apiClient";

export interface User {
  id: string;
  nickName: string;
  profileImg: string;
}

export interface Comment {
  id: string;
  contents: string;
}

export interface BulletinBoard {
  id: string;
  title: string;
  contents: string;
  img: string;
  updatedAt: string;
  like: number;
  comment?: Comment[];
  user: User;
}

export interface BulletinBoardsResponse {
  data: BulletinBoard[];
  nextCursor: string | null;
}

/**
 * 게시글 목록을 가져옵니다.
 * @param options - 정렬 기준, 커서, 한 번에 가져올 개수 옵션
 *    - sort: "like" 또는 "createdAt" (기본: "createdAt")
 *    - cursor: 이전 페이지의 마지막 게시글 id (커서)
 *    - limit: 한 페이지에 가져올 게시글 수
 */
const GetAll = async (options?: {
  sort?: "like" | "createdAt";
  cursor?: string;
  limit?: number;
}): Promise<BulletinBoardsResponse> => {
  const { sort = "createdAt", cursor, limit } = options || {};
  const params = new URLSearchParams();

  if (sort === "like") {
    params.append("sort", "like");
  }
  if (cursor) {
    params.append("cursor", cursor);
  }
  if (limit) {
    params.append("limit", limit.toString());
  }
  const query = params.toString() ? `?${params.toString()}` : "";
  try {
    const response: AxiosResponse<BulletinBoardsResponse> =
      await apiClientList.apiClient.get(`/bulletinBoard/${query}`);
    return response.data;
  } catch (error) {
    throw new Error("게시글 목록을 가져오는데 실패했습니다.");
  }
};

/**
 * 좋아요 순 상위 게시글 조회
 */
const TopLike = async (): Promise<BulletinBoard[]> => {
  try {
    const response: AxiosResponse<BulletinBoard[]> =
      await apiClientList.apiClient.get("/bulletinBoard/topLike");
    return response.data;
  } catch (error) {
    throw new Error("상위 게시글 조회에 실패했습니다.");
  }
};

/**
 * 게시글을 등록합니다.
 * @param userId - 게시글 작성자의 ID
 * @param boardData - 게시글 데이터 (예: title, contents 등)
 */
const Upload = async (
  userId: string,
  boardData: {
    title: string;
    contents: string;
    like: number;
    [key: string]: any;
  }
): Promise<BulletinBoard> => {
  try {
    const response: AxiosResponse<BulletinBoard> =
      await apiClientList.apiClient.post(`/bulletinBoard/Register/`, boardData);
    return response.data;
  } catch (error) {
    throw new Error("게시글 등록에 실패했습니다.");
  }
};

/**
 * 게시글을 수정합니다.
 * @param boardId - 수정할 게시글의 ID
 * @param boardData - 수정할 데이터 (예: title, contents)
 */
const Update = async (
  boardId: string,
  boardData: { title?: string; contents?: string; like?: number }
): Promise<BulletinBoard> => {
  try {
    // PATCH 메서드를 사용하여 일부 필드만 업데이트합니다.
    const response: AxiosResponse<BulletinBoard> =
      await apiClientList.apiClient.patch(
        `/bulletinBoard/modify/${boardId}`,
        boardData
      );
    return response.data;
  } catch (error) {
    throw new Error("게시글 수정에 실패했습니다.");
  }
};

/**
 * 게시글을 삭제합니다.
 * @param boardId - 삭제할 게시글의 ID
 */
const Del = async (boardId: string): Promise<void> => {
  try {
    await apiClientList.apiClient.delete(`/bulletinBoard/delete/${boardId}`);
  } catch (error) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }
};

export const BulletinBoardList = { GetAll, TopLike, Upload, Update, Del };
