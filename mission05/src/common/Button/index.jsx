import { styled } from "styled-components";

export default function Button({ children }) {
  return (
    <>
      <CommonBTN>{children}</CommonBTN>
    </>
  );
}

const CommonBTN = styled.button`
  background-color: #3692ff;
  color: "#F3F4F6";
  font-size: 1rem;
  font-weight: 600;
  line-height: 26px;

  border: none;
  border-radius: 8px;

  padding: 8px 23px;
`;
