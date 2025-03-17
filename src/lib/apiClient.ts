interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  skipAuth?: boolean;
}

export class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "ApiError";
  }
}
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, skipAuth = false, headers, body, ...restOptions } = options;
    const url = this.createUrl(path, params);

    let requestHeaders: HeadersInit = {
      ...headers,
      "Content-Type": "application/json",
    };

    if (!skipAuth) {
      const accessToken = await this.getAccessToken();
      if (accessToken) {
        requestHeaders = {
          ...requestHeaders,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }

    try {
      const response = await fetch(url, {
        ...restOptions,
        method,
        headers: {
          ...requestHeaders,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "에러 메시지 없음";
        const error = new ApiError(errorMessage, response.status);
        throw error;
      }

      return response.json();
    } catch (error) {
      console.error("API 요청 오류:", error);
      throw error;
    }
  }

  private async getAccessToken(): Promise<string> {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    return token;
  }

  private createUrl(path: string, params?: Record<string, string>): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${normalizedPath}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  async get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>("GET", path, options);
  }

  async post<T>(
    path: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.request<T>("POST", path, { ...options, body });
  }

  async patch<T>(
    path: string,
    body: any,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.request<T>("PATCH", path, { ...options, body });
  }

  async delete<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>("DELETE", path, options);
  }
}

export const apiClient = new ApiClient("https://panda-market-api.vercel.app");
