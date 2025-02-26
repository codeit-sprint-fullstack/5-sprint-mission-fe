export type Name = keyof typeof INPUT_VALID;

export const INPUT_VALID = {
  title: {
    pattern: /^.{2,30}$/, // 2~30자
    message: "제목은 2자이상 30자미만으로 작성해주세요.",
  },
  content: {
    pattern: /^.{10,}$/, // 최소 10자 이상
    message: "내용은 최소 10자 이상 작성해주세요.",
  },
  comment: {
    pattern: /^.{5,}$/, // 최소 5자 이상
    message: "내용은 최소 5자 이상 작성해주세요.",
  },
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "이메일 형식에 맞게 작성해주세요.",
  },
};

export const TRANSLATE = {
  title: { label: "제목", placeholder: "제목을 입력해주세요" },
  content: { label: "내용", placeholder: "내용을 입력해주세요" },
  comment: { label: "댓글달기", placeholder: "댓글을 입력해주세요" },
  email: { label: "이메일", placeholder: "이메일을 입력해주세요" },
};
