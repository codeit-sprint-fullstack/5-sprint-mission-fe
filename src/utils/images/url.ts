// 백엔드에서 전달된 이미지 경로를 완전한 URL로 변환
export const getImageUrl = (
  url: string | undefined,
  fallbackImage: string = ""
): string => {
  if (!url) return fallbackImage;

  // 유효한 URL인지 확인
  try {
    // AWS S3 버킷 URL 또는 이미 올바른 URL 형식인 경우
    if (
      url.includes("s3.ap-northeast-2.amazonaws.com") ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }

    return url;
  } catch (error) {
    console.error("이미지 URL 변환 중 오류 발생:", error);
    return fallbackImage;
  }
};
