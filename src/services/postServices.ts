import { apiClient } from "@/lib/apiClient";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
  };
}

// 게시글 목록 조회
export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await apiClient.get<Post[]>("/api/posts");
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 게시글 좋아요
export const likePost = async (postId: number): Promise<Post> => {
  try {
    const post = await apiClient.post<Post>(`/api/posts/${postId}/like`);
    return post;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};
