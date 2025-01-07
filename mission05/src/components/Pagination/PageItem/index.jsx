import styled from "styled-components";

export default function PageItem({ children, isSelect, onClick }) {
  const handleClick = () => {
    if (isNaN(+children))
      onClick(); // 숫자가 아닌 경우인 화살표 버튼인 경우 이동
    else onClick(children); // 숫자인 경우 그 페이지로 이동
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
