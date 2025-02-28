import React, { useState } from "react";
import "./Registration.css";
import Nav from "../Nav";
import Footer from "../Footer";
import useValidation from "./useValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import rmImg from "../../assets/ic_X.png";

function Registration() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]); // 태그 상태 관리
  const [tagError, setTagError] = useState(""); // 태그 에러 메시지 상태

  const validationRules = {
    productName: (value) =>
      value.length < 1 || value.length > 10
        ? "상품명은 1자 이상, 10자 이내여야 합니다."
        : "",
    description: (value) =>
      value.length < 10 || value.length > 100
        ? "상품 소개는 10자 이상, 100자 이내여야 합니다."
        : "",
    price: (value) =>
      isNaN(value) || value.trim() === "" ? "판매 가격은 숫자여야 합니다." : "",
    tags: (value) => "",
  };

  const { values, errors, handleChange } = useValidation(
    {
      productName: "",
      description: "",
      price: "",
      tags: "",
    },
    validationRules
  );

  const handleTagChange = (event) => {
    const newTag = event.target.value.trim();
    handleChange(event); // 기존 값 업데이트
    if (newTag.length > 5) {
      setTagError("태그는 5글자 이내여야 합니다."); // 에러 메시지 설정
    } else {
      setTagError(""); // 에러 메시지 초기화
    }
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = values.tags.trim();
      if (newTag && newTag.length <= 5 && !tags.includes(`#${newTag}`)) {
        setTags([...tags, `#${newTag}`]); // 태그 앞에 # 추가
      }
      handleChange({ target: { name: "tags", value: "" } }); // 입력란 초기화
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)); // 태그 삭제
  };

  const handleSubmit = async () => {
    const isValid = Object.values(errors).every((error) => !error);
    if (!isValid || tagError) {
      alert("입력값을 확인해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://db-1-45k6.onrender.com/api/products",
        {
          name: values.productName,
          description: values.description,
          price: values.price,
          tags: tags, // 태그 리스트 전송
        }
      );
      alert("상품이 등록되었습니다.");
      console.log("등록된 상품:", response.data);
      navigate("/items");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Nav />
      <div className="registration">
        <div className="registrationContainer">
          <div className="registrationTitle">
            <div>상품 등록 하기</div>
            <div className="registrationTitleButton" onClick={handleSubmit}>
              등록
            </div>
          </div>
          <div className="registrationInputContainer">
            <div>상품명</div>
            <textarea
              name="productName"
              className={`registrationInputBox1 ${
                errors.productName ? "error-border" : ""
              }`}
              placeholder="상품명을 입력해주세요"
              value={values.productName}
              onChange={handleChange}
            ></textarea>
            {errors.productName && (
              <div className="error-message">{errors.productName}</div>
            )}
          </div>
          <div className="registrationInputContainer">
            <div>상품소개</div>
            <textarea
              name="description"
              className={`registrationInputBox2 ${
                errors.description ? "error-border" : ""
              }`}
              placeholder="상품 소개를 입력해주세요"
              value={values.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>
          <div className="registrationInputContainer">
            <div>판매가격</div>
            <textarea
              name="price"
              className={`registrationInputBox1 ${
                errors.price ? "error-border" : ""
              }`}
              placeholder="판매 가격을 입력해주세요"
              value={values.price}
              onChange={handleChange}
            ></textarea>
            {errors.price && (
              <div className="error-message">{errors.price}</div>
            )}
          </div>
          <div className="registrationInputContainer">
            <div>태그</div>
            <textarea
              name="tags"
              className={`registrationInputBox1 ${
                tagError ? "error-border" : ""
              }`}
              placeholder="태그를 입력 후 Enter를 누르세요"
              value={values.tags}
              onChange={handleTagChange} // 실시간 에러 체크
              onKeyDown={handleTagKeyDown}
            ></textarea>
            {tagError && <div className="error-message">{tagError}</div>}
            <div className="tags-container">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                  <div className="remove-tag" onClick={() => removeTag(tag)}>
                    <img src={rmImg} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Registration;
