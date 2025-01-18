import { useState, useEffect } from "react";
import axios from "axios";
import useValidation from "./hooks/useValidation.js";
import config from "../../config.js";

export default function ProductForm() {
  const { values, errors, isValid, handleChange, validateForm } = useValidation(
    {
      name: "",
      description: "",
      price: "",
      tags: "",
    },
  );

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
    if (e.key === "Enter" && tagInput.length <= 5) {
      setTags((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    if (isValid) {
      try {
        const response = await axios.post(config.API_URL, {
          name: values.name,
          description: values.description,
          price: values.price,
          tags: tags,
        });
        console.log("상품 등록 성공:", response.data);
      } catch (error) {
        console.error("상품 등록 실패:", error);
        alert("상품 등록 실패: " + error.message);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [values]);

  return (
    <div className="px-4 max-w-[1150px] mx-auto">
      <form onSubmit={handleSubmit} className="mb-[160px] mt-6">
        <div className="flex justify-between items-center mt-5">
          <p className="text-xl font-bold">상품 등록하기</p>
          <button
            type="submit"
            disabled={!isValid}
            className={` ${!isValid ? "bg-[#9CA3AF]" : "bg-[#3692FF]"} px-[23px] py-2 rounded-lg text-white font-bold`}
          >
            등록
          </button>
        </div>
        <div className="flex flex-col">
          <label className="text-[18px] font-bold">상품명</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            className="rounded-lg bg-[#F3F4F6] px-6 py-4 mt-4"
          />
          {errors.productName && (
            <p className="text-red-500">{errors.productName}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-[18px] font-bold mt-8">상품 소개</label>
          <textarea
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="상품소개를 입력해주세요"
            className="rounded-lg bg-[#F3F4F6] px-6 py-4 mt-4 h-[280px]"
          />
          {errors.productDescription && (
            <p className="text-red-500">{errors.productDescription}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-[18px] font-bold mt-8">판매 가격</label>
          <input
            type="text"
            name="price"
            value={values.price}
            onChange={handleChange}
            placeholder="판매가격을 입력해주세요"
            className="rounded-lg bg-[#F3F4F6] px-6 py-4 mt-4"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-[18px] font-bold mt-8">태그</label>
          <input
            type="text"
            name="tags"
            value={tagInput}
            onChange={handleTagInput}
            onKeyDown={handleTagInput}
            placeholder="태그를 입력해주세요"
            className="rounded-lg bg-[#F3F4F6] px-6 py-4 mt-4"
          />
          {tagInput && tagInput.length > 5 && (
            <p className="text-red-500">태그는 5자 이내여야 합니다.</p>
          )}
        </div>

        <div>
          {tags.map((tag, index) => (
            <span key={index} className="mr-2 bg-gray-200 p-2">
              {tag}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}
