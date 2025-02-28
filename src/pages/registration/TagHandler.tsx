import React, { useState } from "react";
import styled from "styled-components";
import Ximg from "../../assets/images/ic_X.png";
import useValidation from "../../components/hooks/useValidation";
import { colors } from "../../assets/theme";
import { InputHTMLAttributes } from "react";

//Tag 5글자 이상 유효성 검증이 안되고있음.

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  //StyledInput 컴포넌트의 props 타입을 정의
  //error boolean 을 추가하여 입력 필드가 에러 상태일 때 스타일을 바꿀 수 있음
}

const validateTag = (value: string, tags: string[]) => {
  //입력값 검증
  if (tags.length > 0) return "";
  if (!value.trim()) return "태그를 입력하세요.";
  if (value.length > 5) return "5글자 이내로 입력해주세요";
  return "";
};

interface TagHandlerProps {
  tags: string[];
  setTags: (newTags: string[]) => void;
}

function TagHandler({ tags, setTags }: TagHandlerProps) {
  const { value, error, onChange, onBlur, reset } = useValidation((value) =>
    validateTag(value, tags)
  );
  const addTag = () => {
    if (!error && value.trim() && !tags.includes(value)) {
      setTags([...tags, value.trim()]);
      reset();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <InputFieldWrapper>
        <StyledInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="태그를 입력하세요"
          error={!!error}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputFieldWrapper>
      <TagWrapper>
        {tags.map((tag, index) => (
          <Tag key={index}>
            #{tag}
            <RemoveIcon onClick={() => removeTag(tag)}>
              <img src={Ximg} alt="삭제" />
            </RemoveIcon>
          </Tag>
        ))}
      </TagWrapper>
    </div>
  );
}

export default TagHandler;

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "error",
})<{
  error?: boolean;
}>`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background-color: ${colors.gray2};
  border: 2px solid ${(props) => (props.error ? "red" : "transparent")};
  border-radius: 10px;

  &::placeholder {
    color: ${colors.gray5};
  }

  &:focus {
    border-color: ${(props) => (props.error ? "red" : colors.gray5)};
  }
`;

const ErrorMessage = styled.span`
  color: red;
  padding-left: 15px;
  font-size: 14px;
  margin-top: 5px;
`;

const TagWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 6px 12px;
  background-color: ${colors.gray2};
  border-radius: 20px;
  font-size: 16px;
  color: ${colors.gray8};
  border: none;
  display: flex;
  align-items: center;
`;

const RemoveIcon = styled.span`
  margin-left: 8px;
  color: red;
  cursor: pointer;
`;
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
