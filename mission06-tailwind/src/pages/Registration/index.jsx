import { useState } from "react";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import Textarea from "../../common/components/Textarea/index.jsx";
import TagItem from "./components/TagItem";
import TagInput from "./components/TagInput/index.jsx";
import {
  productErrorMessage,
  descriptionErrorMessage,
  priceErrorMessage,
  tagErrorMessage,
} from "../../common/constants/inputErrorMessage.js";
import {
  hasMaxLength,
  hasMinLength,
  isNumber,
} from "../../common/constants/inputValidation.js";

export default function Registration() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    tags: [],
  });
  const [isFormValid, setIsFormValid] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  // form 제출용도
  const handleSubmit = (e) => {
    e.preventDefault();

    const isActive = Object.values(isFormValid).every(
      (value) => value === true
    );
    if (!isActive) {
      console.log("모든 폼에 올바른 값을 입력해주세요!");
      return;
    }

    console.log(data);
    // 폼 제출 로직
    setData({
      name: "",
      description: "",
      price: 0,
      tags: [],
    });
  };

  // 태그 엔터 눌렀을 때 반응
  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키의 기본 동작만 막습니다
      const newTag = e.target.value.trim();

      if (data.tags.includes(newTag)) return;

      if (newTag !== "" && hasMaxLength(newTag, 5)) {
        setData((prevData) => {
          const updatedTags = [...prevData.tags, newTag]; // 새로운 태그 추가
          return { ...prevData, tags: updatedTags };
        });

        e.target.value = ""; // 입력 필드를 초기화
      }
    }
  };

  // tagItem 컴포넌트에서 태그 삭제 시 반응
  const handleDelete = (index) => {
    const updatedTags = data.tags.filter((tag, idx) => idx !== index);
    setData({ ...data, tags: updatedTags });
  };

  return (
    <main>
      <form className="flex flex-col gap-[24px] w-full max-w-screen-xl px-[24px] md:px-[16px] mx-auto mb-[160px] mt-[26px] tb:mt-[24px] md:tb-[28px]">
        <section className="flex items-center justify-between">
          <h1 className="text-[#1F2937] font-bold text-[1.25rem] leading-[32px]">
            상품 등록하기
          </h1>
          <Button type="button" onClick={handleSubmit}>
            등록
          </Button>
        </section>

        <Input
          label="상품명"
          id="name"
          type="text"
          name="name"
          placeholder="상품명을 입력해주세요"
          initValue=""
          data={data}
          onChange={setData}
          isValid={(value) => hasMaxLength(value, 10)} // 10자 이내
          errorMessage={productErrorMessage}
          setIsFormValid={setIsFormValid}
        />

        <Textarea
          label="상품소개"
          id="description"
          name="description"
          placeholder="상품 소개를 입력해주세요"
          initValue=""
          data={data}
          onChange={setData}
          isValid={(value) =>
            hasMinLength(value, 10) && hasMaxLength(value, 100)
          } // 10자 이상 100자 이내
          errorMessage={descriptionErrorMessage}
          setIsFormValid={setIsFormValid}
        />

        <Input
          label="판매가격"
          id="price"
          type="text"
          name="price"
          placeholder="판매 가격을 입력해주세요"
          initValue={0}
          data={data}
          onChange={setData}
          isValid={(value) => isNumber(value)} // 숫자만
          errorMessage={priceErrorMessage}
          setIsFormValid={setIsFormValid}
        />

        <TagInput
          label="태그"
          id="tags"
          type="text"
          name="tags"
          placeholder="태그를 입력해주세요"
          handleKeyDown={handleKeyDown}
          isValid={(value) => hasMaxLength(value, 5)} // 5자 이내
          errorMessage={tagErrorMessage}
          setIsFormValid={setIsFormValid}
        />

        <section className="flex flex-wrap gap-[12px]">
          {data.tags.map((tag, index) => (
            <TagItem
              key={`${tag}-${index}`}
              onDelete={() => handleDelete(index)}
            >
              {tag}
            </TagItem>
          ))}
        </section>
      </form>
    </main>
  );
}
