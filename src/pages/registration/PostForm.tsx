import React, { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagHandler from "./TagHandler";
import ValidatedInput from "./ValidateInput";

interface ProductData {
  name: string;
  description: string;
  price: number | string; // 입력 중에는 string, 제출 시 number
  tags: string[];
}

function PostForm() {
  const url = "https://five-sprint-mission-be-zs3c.onrender.com/products";
  const navigate = useNavigate();
  const [data, setData] = useState<ProductData>({
    //초기 상태 설정
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault(); //페이지 새로고침 방지
    axios
      .post(url, {
        //입력된 데이터 서버로 전송
        name: data.name,
        description: data.description,
        price: data.price,
        tags: data.tags,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/products/${res.data.id}`);
      })
      .catch((err) => {
        console.error("Error posting data:", err.response?.data || err.message);
      });
  }

  function handle(e: ChangeEvent<HTMLInputElement>): void {
    //입력값 변경 시 호출
    const newdata = { ...data };
    newdata[e.target.id] =
      e.target.id === "price" ? parseFloat(e.target.value) : e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <>
      {/* 폼태그에 id값 설정 -> index.tsx에서 document.getElementById("post-form")는
     DOM에서 해당 ID를 가진 <form> 요소를 찾고, 이를 참조 */}
      <form id="post-form" onSubmit={submit}>
        <Section>
          <Label>상품명</Label>
          <ValidatedInput
            id="name"
            placeholder="상품명을 입력하세요"
            type="text"
            validateFn={validateName}
            onValidChange={(value) =>
              setData((prev) => ({ ...prev, name: value }))
            }
          />
        </Section>
        <Section>
          <Label>상품 소개</Label>
          <ValidatedInput
            id="description"
            placeholder="상품 소개를 입력하세요"
            type="text"
            isDescription
            validateFn={validateDescription}
            onValidChange={(value) =>
              setData((prev) => ({ ...prev, description: value }))
            }
          />
        </Section>
        <Section>
          <Label>판매가격</Label>
          <ValidatedInput
            id="price"
            placeholder="판매가격을 입력하세요"
            type="text"
            validateFn={(value) => validatePrice(parseFloat(value))}
            onValidChange={(value) =>
              setData((prev) => ({ ...prev, price: parseFloat(value) || "" }))
            }
          />
        </Section>
        <Section>
          <Label>태그</Label>
          <TagHandler
            tags={data.tags}
            setTags={(newTags) =>
              setData((prevData) => ({ ...prevData, tags: newTags }))
            }
          />
        </Section>
      </form>
    </>
  );
}

export default PostForm;

export const validateName = (value: string): string | null => {
  if (!value.trim()) return "상품명을 입력하세요.";
  if (value.length > 10) return "10자 이내로 입력해주세요";
  return null; // 유효할 경우 null 반환
};

export const validateDescription = (value: string): string | null => {
  if (!value.trim()) return "상품 소개를 입력해주세요";
  if (value.length < 10) return "10자 이상 입력해주세요";
  return null;
};

export const validatePrice = (value: number | null): string | null => {
  if (value === null) return "판매가격을 입력하세요.";
  if (isNaN(value)) return "숫자로 입력해주세요";
  if (value > 1000000000) return "가격을 10억 이하로 입력해주세요";
  return null;
};

const Section = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-top: 10px;
`;
