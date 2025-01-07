import styled from "styled-components";

export default function PageItem({ children, isSelect, onClick }) {
  const handleClick = () => {
    if (isNaN(+children)) onClick();
    else onClick(children);
  };

  return (
    <Item onClick={handleClick} $isSelect={isSelect}>
      {children}
    </Item>
  );
}

const Item = styled.div`
  background-color: ${({ $isSelect }) => ($isSelect ? "#2F80ED" : "white")};
  color: ${({ $isSelect }) => ($isSelect ? "#FFFFFF" : "#6B7280")};
  width: 40px;
  height: 40px;
  border: none;
  border: 1px solid ${({ $isSelect }) => ($isSelect ? "#2F80ED" : "#e5e7eb")};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
