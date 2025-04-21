// 백엔드에서 전달된 이미지 경로를 완전한 URL로 변환
export const getImageUrl = (
  url: string,
  fallbackImage: string = ""
): string => {
  if (!url) return fallbackImage;

  // 유효한 URL인지 확인
  try {
    // 백엔드 서버에서 전달된 절대 경로 처리
    if (
      url.includes("/Users/hayoon/Desktop/codeit/5-sprint-mission-be/uploads")
    ) {
      // 절대 경로에서 /uploads 부분만 추출
      return url.replace(
        /^.*\/Users\/hayoon\/Desktop\/codeit\/5-sprint-mission-be(\/uploads\/.*)$/,
        "http://localhost:5005$1"
      );
    }

    // 이미 올바른 URL 형식인 경우
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/uploads/")
    ) {
      return url;
    }

    // 상대 경로일 경우 적절한 기본 URL 추가
    if (url.startsWith("/")) {
      return `http://localhost:5005${url}`;
    }

    return url;
  } catch (error) {
    console.error("이미지 URL 변환 중 오류 발생:", error);
    return fallbackImage;
  }
};
