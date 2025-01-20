import { useEffect, useState } from 'react';
import '../../../../styles/Registration.css';
import { TagElement } from './TagElement';
import { useNavigate } from 'react-router-dom';
import { useNameCheck } from '../../../../hooks/useNameCheck.js';
import { useDescriptionCheck } from '../../../../hooks/useDescriptionCheck.js';
import { usePriceCheck } from '../../../../hooks/usePriceCheck.js';
import { useTagCheck } from '../../../../hooks/useTagCheck.js';

export function Registration({ userEnv, setPageFocus }) {
  useEffect(() => {
    setPageFocus('registration');
  }, []);

  const [name, nameCheck, handleNameInputChange, handleNameCheck] = useNameCheck();
  const [
    description,
    descriptionCheck,
    handleDescriptionInputChange,
    handleDescriptionCheck,
  ] = useDescriptionCheck();
  const [price, priceCheck, handlePriceInputChange, handlePriceCheck] =
    usePriceCheck();
  const [tag, setTag, tagCheck, handleTagInputKeyDown, handleTagChange] =
    useTagCheck();

  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (
      nameCheck === 'checked' &&
      descriptionCheck === 'checked' &&
      priceCheck === 'checked'
    ) {
      setVerified(true);
    }
  }, [nameCheck, descriptionCheck, priceCheck, tagCheck]);

  async function handleRegisterClick(e) {
    if (verified) {
      const response = await fetch(
        'https://todo-api-xse8.onrender.com/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            description: description,
            price: Number(price),
            tags: tag,
          }),
        }
      );
      navigate('/items');
    }
  }

  return (
    <div className={userEnv}>
      <div className="registrationTitle">
        <h3>상품 등록하기</h3>
        <button
          className={verified ? 'registerBtnEnabled' : 'registerBtn'}
          onClick={handleRegisterClick}
        >
          등록
        </button>
      </div>
      <div className="inputDiv">
        <h4>상품명</h4>
        <input
          className={nameCheck === 'notChecked' ? 'unchecked' : {}}
          placeholder="상품명을 입력해주세요"
          onChange={handleNameInputChange}
          onBlur={handleNameCheck}
        ></input>
        {nameCheck === 'notChecked' && (
          <div className="errorMessage">1자 이상, 10자 이내로 입력해주세요</div>
        )}
      </div>
      <div className="inputDiv">
        <h4>상품 소개</h4>
        <textarea
          className={
            descriptionCheck === 'notChecked'
              ? 'descriptionInputNotChecked'
              : 'descriptionInput'
          }
          placeholder="상품 소개를 입력해주세요"
          onChange={handleDescriptionInputChange}
          onBlur={handleDescriptionCheck}
        ></textarea>
        {descriptionCheck === 'notChecked' && (
          <div className="errorMessage">
            10자 이상, 100자 이내로 입력해주세요.
          </div>
        )}
      </div>
      <div className="inputDiv">
        <h4>판매가격</h4>
        <input
          className={priceCheck === 'notChecked' ? 'unchecked' : {}}
          placeholder="판매 가격을 입력해주세요"
          onChange={handlePriceInputChange}
          onBlur={handlePriceCheck}
        ></input>
        {priceCheck === 'notChecked' && (
          <div className="errorMessage">숫자로 입력해주세요</div>
        )}
      </div>
      <div className="tagInputDiv">
        <h4>태그</h4>
        <input
          className={tagCheck === 'notChecked' ? 'unchecked' : 'tagInput'}
          placeholder="태그를 입력해주세요"
          onKeyDown={handleTagInputKeyDown}
          onChange={handleTagChange}
        ></input>
        {tagCheck === 'notChecked' && (
          <div className="errorMessage">5글자 이내로 입력해주세요</div>
        )}
      </div>
      <div className="tags">
        {tag &&
          tag.map((tagElement, index) => {
            return (
              <TagElement key={index} setTag={setTag} tag={tag}>
                {tagElement}
              </TagElement>
            );
          })}
      </div>
    </div>
  );
}
