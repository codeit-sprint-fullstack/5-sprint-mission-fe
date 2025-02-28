import { useState } from "react";

const useProductValidation = () => {
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    tag: "",
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value || value.length < 1 || value.length > 10) {
          error = "상품명은 1자 이상, 10자 이내여야 합니다.";
        }
        break;
      case "description":
        if (!value || value.length < 10 || value.length > 100) {
          error = "상품 소개는 10자 이상, 100자 이내여야 합니다.";
        }
        break;
      case "price":
        if (!value || isNaN(value)) {
          error = "판매 가격은 숫자여야 합니다.";
        }
        break;
      case "tag":
        if (!value || value.length > 5) {
          error = "태그는 5글자 이내여야 합니다.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";
  };

  return { errors, validateField };
};

export default useProductValidation;
