import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createItemAPI } from "../../../utils/APIs/createItemAPI";

//XXX:
//1. input에서 받은 value를 body에 일단 담는다.
//2. body 업데이트되면 useCallback이 돌면서 리렌더링.
//3. 그때 유효성 검사 함수를 타면서 에러 ui보여주기
//4. 모든 필수 필드에 유효한 값이 있을 떄 등록 버튼 활성화

//input 유효성 검사 규칙
//validate true일때 error
const validRules = {
  name: {
    validate: (name) => name.length > 10,
    errMsg: "10자 이내로 입력해주세요",
  },
  description: {
    validate: (desc) => desc.length < 10 || desc.length > 100,
    errMsg: "10자 이상, 100자 이내로 입력해주세요",
  },
  price: {
    validate: (price) => {
      const numberPrice = Number(price);
      return isNaN(numberPrice) || numberPrice === 0;
    },
    errMsg: "1원 이상 숫자로 입력해주세요",
  },
  tagInput: {
    validate: (tag) => tag.length > 5,
    errMsg: "5글자 이내로 입력해주세요",
  },
};

export const useRegItem = () => {
  const [body, setBody] = useState({
    tags: [],
  });
  const navi = useNavigate();

  //req보낼 body 업데이트
  const updateBody = useCallback((field, value) => {
    setBody((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  //body.tags 배열 업데이트
  const updateTags = useCallback(
    (newTag) => {
      if (!newTag || body.tags.includes(newTag)) return; //빈 문자열, 중복태그 저장x

      //업데이트 하기 전에 tagInput field로 유효성 검사해서 통과한 것만 body의 tags 배열에 추가, 태그칩 생성하기
      const isValid = !validRules.tagInput.validate(newTag);
      const updatedTags = isValid ? [...body.tags, newTag] : [...body.tags];

      setBody((prev) => ({
        ...prev,
        tags: updatedTags,
        tagInput: newTag,
      }));
    },
    [body.tags]
  );

  //태그칩 x아이콘 클릭 시 삭제
  const deleteTag = useCallback(
    (clickedTag) => {
      const updatedTags = body.tags.filter((tag) => tag !== clickedTag);
      setBody((prev) => ({ ...prev, tags: updatedTags }));
    },
    [body.tags]
  );

  //input value 유효성 검사
  const isInputValid = (fieldName) => {
    const rule = validRules[fieldName];
    const value = body[fieldName];

    //초기 기본값
    if (value === undefined) {
      return {
        isError: false,
        errMsg: "",
      };
    }

    //현재 업데이트된 body의 value 유효성 검사하여 에러 여부와 메시지 전달, ui 구현에 사용
    return {
      isError: rule.validate(value),
      errMsg: rule.errMsg,
    };
  };

  //최신 body로 post api 요청
  const usePostItem = useCallback(async () => {
    try {
      const response = await createItemAPI(body);
      console.log("상품 등록 완료 :", response.data);
      const itemId = response.data._id;
      navi(`/items/${itemId}`);
    } catch (error) {
      console.error("상품 등록하기 오류: ", error);
    }
  }, [body]);

  // 등록 버튼 활성화 함수
  const isFormDisabled = useCallback(() => {
    const { name, description, price } = body;
    const {
      name: nameRule,
      description: descRule,
      price: priceRule,
    } = validRules;

    const isNameError = !name || nameRule.validate(name);
    const isDescError = !description || descRule.validate(description);
    const isPriceError = !price || priceRule.validate(price);

    const hasAllRequiredFields = Boolean(name && description && price);
    const isDisabled =
      isNameError || isDescError || isPriceError || !hasAllRequiredFields;

    // console.log("=========================");
    // console.log("모든 필드 유효성 검사: ", isDisabled);
    // console.log("=========================");

    //필수 필드가 모두 유효할 때 true
    return isDisabled;
  }, [body]);

  return {
    body,
    setBody,
    updateTags,
    deleteTag,
    updateBody,
    isInputValid,
    usePostItem,
    isFormDisabled,
    validRules,
  };
};
