import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (field, value, skipEmpty = false) => {
    let error = "";

    // 초기 상태인 빈 값 유효성 검사 생략
    // skipEmpty: 비어 있는 값을 건너뛰는 기능
    if (skipEmpty && value === "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
      return true;
    }

    if (field === "name") {
      // 상품명 확인
      if (value.length <= 1 || value.length > 10) {
        error = "10자 이내로 입력해주세요";
      }
    } else if (field === "description") {
      // 상품 소개 확인
      if (value.length < 10 || value.length > 100) {
        error = "상품 소개는 10자 이상, 100자 이내로 입력해주세요.";
      }
    } else if (field === "price") {
      // 가격 확인(숫자만)
      if (!/^\d+$/.test(value)) {
        error = "숫자로 입력해주세요.";
      }
    } else if (field === "tag") {
      // 태그확인
      if (value.length > 5) {
        error = "5글자 이내로 입력해주세요.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error === "";
  };

  return { errors, validate };
};

export default useValidation;
