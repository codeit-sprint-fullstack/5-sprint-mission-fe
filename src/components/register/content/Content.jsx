import { useState } from "react";
import { apiList } from "../../api/api.js";
import { Link, useNavigate } from "react-router-dom";

import { useInputValidation } from "../hook/useInputValidation.jsx";
import {
  validateName,
  validateDescription,
  validatePrice,
  validateTags,
} from "../hook/validation.jsx";

import "./Content.css";

export function Content() {
  //pc : 1200px이상  tablet : 744px이상  mobile : 743px이하 375px이상
  const [apiData, setApiData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  // useNavigate 이동할 때 쓸 수 있는거
  const navigate = useNavigate();
  // 커스텀 훅에서는 useState 자리에 저렇게 넣을 수 있네
  const nameInput = useInputValidation("", validateName);
  const descriptionInput = useInputValidation("", validateDescription);
  const priceInput = useInputValidation("", validatePrice);
  const tagsInput = useInputValidation("", validateTags);

  const handleSubmit = () => {
    if (
      nameInput.error ||
      descriptionInput.error ||
      priceInput.error ||
      tagsInput.error
    ) {
      alert("입력값을 확인해주세요.");
      return;
    } else {
      resultPost();
      console.log(postSuccess);
      if (postSuccess) console.log("진입완료");
      navigate("/detail");
    }
  };

  const productData = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    tags: tagsInput.value,
  };

  console.log("상품 데이터:", productData);

  async function resultPost() {
    console.log("useEffect 실행");
    try {
      console.log("API 실행");
      const response = await apiList.ProductRegister(productData);
      console.log(response);
      setPostSuccess(true);
      console.log("넌 트루여야해" + postSuccess);
      setApiData(response);
    } catch (error) {
      console.error(" Error :", error);
    }
  }

  return (
    <div id="content">
      <div className="registration">
        <div>상품 등록하기</div>
        <button className="btn" onClick={handleSubmit}>
          등록
        </button>
      </div>

      <div className="name">
        <div className="title">상품명</div>
        <div className="name-input-box box">
          <input
            className="name-input input"
            type="text"
            value={nameInput.value}
            onChange={nameInput.handleChange}
            placeholder="상품명을 입력해주세요"
          />
          {nameInput.error && (
            <p className="error-message">{nameInput.error}</p>
          )}
        </div>
      </div>

      <div className="introduction">
        <div className="title">상품 소개</div>
        <div className=" input-box box">
          <textarea
            className="introduction-input input"
            type="text"
            value={descriptionInput.value}
            onChange={descriptionInput.handleChange}
            placeholder="상품 소개를 입력해주세요"
          />
          {descriptionInput.error && (
            <p className="error-message">{descriptionInput.error}</p>
          )}
        </div>
      </div>

      <div className="price">
        <div className="title">판매가격</div>
        <div className=" input-box box">
          {}
          <input
            className="price-input input"
            type="number"
            value={priceInput.value}
            onChange={priceInput.handleChange}
            placeholder="판매 가격을 입력해주세요"
          />
          {priceInput.error && (
            <p className="error-message">{priceInput.error}</p>
          )}
        </div>
      </div>

      <div className="tags">
        <div className="title">태그</div>
        <div className=" input-box box">
          <input
            className="tags-input input"
            type="text"
            value={tagsInput.value}
            onChange={tagsInput.handleChange}
            placeholder="태그를 입력해주세요"
          />
          {/* 오류 나면 오류 메세지 띄우기 */}
          {tagsInput.error && (
            <p className="error-message">{tagsInput.error}</p>
          )}
        </div>

        <div className="tag-all">
          <div className="tag">
            <div className="tag-box">
              <div>#티셔츠</div>
              <img src="/img/ic_X.png" alt="x이미지" />
            </div>
          </div>
          <div className="tag">
            <div className="tag-box">
              <div>#상의</div>
              <img src="/img/ic_X.png" alt="x이미지" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
