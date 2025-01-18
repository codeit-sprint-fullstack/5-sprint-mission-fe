import { useState } from 'react';

const validateProductName = (value) => {
  if (value.length < 1) return '상품명은 1자 이상이어야 합니다.';
  if (value.length > 10) return '상품명은 10자 이내여야 합니다.';
  return '';
};

const validateProductDescription = (value) => {
  if (value.length < 10) return '상품 소개는 10자 이상이어야 합니다.';
  if (value.length > 100) return '상품 소개는 100자 이내여야 합니다.';
  return '';
};

const validatePrice = (value) => {
  if (value.length < 1) return '판매 가격을 입력하세요.';
  if (isNaN(value)) return '판매 가격은 숫자여야 합니다.';
  return '';
};

const validateTag = (value) => {
  if (value.length > 5) return '태그는 5자 이내여야 합니다.';
  return '';
};

const useValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = validateProductName(value);
        break;
      case 'description':
        error = validateProductDescription(value);
        break;
      case 'price':
        error = validatePrice(value);
        break;
      case 'tags':
        error = validateTag(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const productNameError = validateProductName(values.name);
    const productDescriptionError = validateProductDescription(values.description);
    const priceError = validatePrice(values.price);
    const tagError = validateTag(values.tags);

    setErrors({
      productName: productNameError,
      productDescription: productDescriptionError,
      price: priceError,
      tag: tagError,
    });

    setIsValid(
      !productNameError && !productDescriptionError && !priceError && !tagError
    );
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    validateForm,
  };
};

export default useValidation;
