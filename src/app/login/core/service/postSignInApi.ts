import { authInstance } from "@/shared/service/auth/authInstance";
// import { handleApiError } from "@/shared/service/auth/handleApiError";
import { AuthResponse, SignInInputDto } from "@/shared/service/auth/type";

/**
 * 로그인 API
 * @param body 로그인 정보(이메일, 비밀번호)
 */
export const postSignInApi = async (
  body: SignInInputDto
): Promise<AuthResponse> => {
  try {
    const response = await authInstance.post<AuthResponse>(
      "/auth/signIn",
      body
    );
    return response.data;
  } catch (err) {
    // throw handleApiError(err);
    throw err;
  }
};
