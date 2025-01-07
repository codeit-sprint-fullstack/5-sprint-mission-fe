import { styled } from "styled-components";

export default function Button({ children, onClick }) {
  return (
    <>
      <CommonBTN onClick={onClick}>{children}</CommonBTN>
    </>
  );
}

const CommonBTN = styled.button`
  background-color: #3692ff;
  color: #f3f4f6;
  font-size: 1rem;
  font-weight: 600;
  line-height: 26px;

  border: none;
  border-radius: 8px;

  padding: 8px 23px;

  &:hover {
    cursor: pointer;
  }
`;
