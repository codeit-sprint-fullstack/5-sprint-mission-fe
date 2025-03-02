import { AxiosResponse } from "axios";
import { instance } from "@/utils/APIs/axiosInstance";
import { Article } from "@/shared/type";

export interface GetArticleDetailApiProps {
  articleId: string;
}

/** 게시글 상세 조회
 */
export const getArticleDetailAPI = async ({
  articleId,
}: GetArticleDetailApiProps): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await instance.get(
      `/articles/${articleId}`
    );
    console.log("getArticleDetail", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
