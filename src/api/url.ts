export const customFetch = async (
  url: string,
  options: RequestInit = {},
  serverAccessToken?: string
): Promise<Response> => {
  const isClient = typeof window !== "undefined";

  const accessToken = isClient
    ? localStorage.getItem("accessToken")
    : serverAccessToken;

  // 항상 Headers 객체로 처리
  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let res = await fetch(`${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // 토큰 만료 시 자동 갱신
  if (res.status === 401 && isClient) {
    console.warn("[🔁 customFetch] 401 Unauthorized. Trying token refresh...");

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshRes.ok) {
      console.error("[❌ customFetch] Token refresh failed.");
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }

    const { accessToken: newToken } = await refreshRes.json();

    // 갱신된 토큰 저장 및 요청 재시도
    localStorage.setItem("accessToken", newToken);

    headers.set("Authorization", `Bearer ${newToken}`);
    res = await fetch(`${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });
  }

  return res;
};
