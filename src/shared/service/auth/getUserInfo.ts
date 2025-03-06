import { authInstance } from "./authInstance";
import { handleApiError } from "./handleApiError";
import { UserInfoResponse } from "./type";

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response = await authInstance.get<UserInfoResponse>("/users/me");
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};
