import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import InputTextarea from "../../common/InputTextarea";
import Tag from "./components/Tag";
import productService from "../../services/ProductService";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: 0,
    tags: [],
  });

  const [tagInput, setTagInput] = useState({
    tagTempValue: "",
    isComposing: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = await productService.postNewProduct(formValues);
    if (newProduct) {
      const newProductId = newProduct.data._id;
      navigate(`/items/${newProductId}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagInputChange = (e) =>
    setTagInput((prev) => ({ ...prev, tagTempValue: e.target.value }));

  // 인풋 태그에서 엔터키 누를 때 반응 제어
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (
      e.key === "Enter" &&
      e.target.name === "tags" &&
      !tagInput.isComposing
    ) {
      const currentTagInputValue = tagInput.tagTempValue.trim();
      const updatedTagValues = formValues.tags.includes(currentTagInputValue)
        ? [...prev.tags, tagInput.tagTempValue.trim()]
        : [...prev.tags];
      setFormValues((prev) => ({
        ...prev,
        tags: [...updatedTagValues],
      }));
      setTagInput((prev) => ({ ...prev, tagTempValue: "" }));
    }
  };

  // 태그 한글 입력 시 문자 조합 상태 관리 - 이거 안하면 "아이패드", "드" 이런 식으로 태그 배열에 들어감...
  const handleTagCompositionState = {
    start: () =>
      setTagInput((prev) => ({
        // 조합 시작
        ...prev,
        isComposing: true,
      })),
    end: () =>
      setTagInput((prev) => ({
        ...prev,
        isComposing: false,
      })),
  };

  // 태그 삭제
  const handleRemoveTag = (index) => {
    const updatedTagValues = formValues.tags.filter((_, i) => i !== index);
    setFormValues((prev) => ({
      ...prev,
      tags: updatedTagValues,
    }));
  };

  return (
    <main className="flex flex justify-center pt-[26px] pb-[162px]">
      <form
        className="flex flex-col items-start w-[1200px] gap-[29px]"
        onSubmit={handleSubmit}
      >
        <header className="w-full flex justify-between">
          <h1 className="text-[20px] font-[700] leading-[32px] text-secondary-800">
            상품 등록하기
          </h1>
          <Button
            isActive={false}
            classNames="rounded-[8px] w-[74px] h-[42px]"
            type="submit"
          >
            등록
          </Button>
        </header>
        <fieldset className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="name"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              상품명
            </label>
            <InputTextarea
              id="name"
              placeholder="상품명을 입력해주세요"
              classNames="w-full"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyDown}
            />
          </div>
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="description"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              상품 소개
            </label>
            <InputTextarea
              id="description"
              placeholder="상품 소개를 입력해주세요"
              InputOrTextarea="textarea"
              classNames="w-full h-[282px]"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyDown}
            />
          </div>
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="price"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              판매 가격
            </label>
            <InputTextarea
              id="price"
              placeholder="판매 가격을 입력해주세요"
              classNames="w-full"
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyDown}
            />
          </div>
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="tag"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              태그
            </label>
            <InputTextarea
              id="tags"
              placeholder="태그를 입력해주세요"
              classNames="w-full"
              name="tags"
              value={tagInput.tagTempValue}
              onChange={handleTagInputChange}
              onKeyDown={handleEnterKeyDown}
              onCompositionStart={handleTagCompositionState.start}
              onCompositionEnd={handleTagCompositionState.end}
            />
          </div>
        </fieldset>
        <div className="flex gap-[10px]">
          {formValues.tags.map((tag, index) => (
            <Tag index={index} onClickRemoveButton={handleRemoveTag}>
              {tag}
            </Tag>
          ))}
        </div>
      </form>
    </main>
  );
}

export default RegistrationPage;
