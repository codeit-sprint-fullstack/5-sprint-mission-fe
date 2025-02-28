import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useValidation from "../../components/hooks/useValidation";
import { colors } from "../../assets/theme";

interface ValidatedInputProps {
  id: string;
  placeholder: string;
  type: string;
  validateFn: (value: string) => string | null;
  isDescription?: boolean;
  onValidChange: (value: string) => void;
}

interface InputFormWrapperProps {
  error?: boolean;
  isdescription?: boolean;
}

// const ConditionalInput = styled.input.attrs<{ isdescription?: boolean }>(
//   (props) => ({
//     as: props.isdescription ? "textarea" : "input",
//   })
// )``;

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  placeholder,
  type,
  validateFn,
  isDescription = false,
  onValidChange,
}) => {
  const { value, error, onChange, onBlur } = useValidation(validateFn);
  const [previousValue, setPreviousValue] = useState(value);

  useEffect(() => {
    if (!error && value !== previousValue) {
      onValidChange(value);
      setPreviousValue(value);
    }
  }, [value, error, previousValue, onValidChange]);

  return (
    <div>
      <InputFormWrapper
        id={id}
        placeholder={placeholder}
        type={type}
        isdescription={isDescription}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

const InputFormWrapper = styled.input<InputFormWrapperProps>`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background-color: ${colors.gray2};
  border: 2px solid ${(props) => (props.error ? "red" : "transparent")}; // Red border on error
  border-radius: 10px;
  height: ${({ isdescription }) =>
    isdescription ? "282px" : "30px"}; // For textarea
  display: block;
  &::placeholder {
    color: ${colors.gray5};
  }
  &:focus {
    border-color: ${(props) => (props.error ? "red" : colors.gray5)};
  }
  ${({ isdescription }) =>
    isdescription &&
    `
      width: 100%;
      padding-top: 1rem;
      text-align: left;
    `}
`;

const ErrorMessage = styled.span`
  color: red;
  padding-left: 15px;
  font-size: 14px;
  margin-top: 5px;
`;

export default ValidatedInput;
