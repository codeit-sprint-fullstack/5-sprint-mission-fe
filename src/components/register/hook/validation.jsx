// 상품명 유효성 검사
// else 안쓴 이유 if마다 return 있어서
export const validateName = (value) => {
  if (!value.trim()) {
    return "상품명을 입력해주세요";
  }
  if (value.length > 10) {
    return "10자 이내로 입력해주세요";
  }
  // 오류 메세지 제거 하고 나가기
  return "";
};

// 상품 소개 유효성 검사
export const validateDescription = (value) => {
  // 공백을 제거 후 값이 있는지
  if (!value.trim()) {
    return "상품 소개를 입력해주세요";
  }
  if (value.length < 10) {
    return "10자 이상 입력해주세요";
  }
  if (value.length > 100) {
    return "100자 이내 입력해주세요";
  }
  return "";
};

// 가격 유효성 검사
export const validatePrice = (value) => {
  // 값이 없으면
  if (!value) return "가격을 입력해주세요";
  // type을 number로 해서 그런지 글자는 value에 안들어가네
  if (isNaN(value) || Number(value) < 0) {
    return "숫자로 입력해주세요";
  }
  return "";
};

// 태그 유효성 검사
export const validateTags = (value) => {
  // 공백을 제거 후 값이 있는지
  if (!value.trim()) return "태그를 입력해주세요";
  if (value.length > 5) {
    return "5자 이내로 입력해주세요";
  }
  return "";
};
