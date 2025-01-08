import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const navItem = [
  { name: "자유게시판", path: "/board" }, // 자유게시판 경로 (예시)
  { name: "중고마켓", path: "/items" }, // 중고마켓 경로
];

export default function Nav() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleNavigation = (path) => {
    navigate(path); // 경로 이동
  };

  return (
    <NavWrapper>
      <NavList>
        {navItem.map((item, idx) => (
          <NavItem key={idx} onClick={() => handleNavigation(item.path)}>
            {item.name}
          </NavItem>
        ))}
      </NavList>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  display: flex;
`;

const NavList = styled.ul`
  display: flex; /* 리스트를 가로로 배치 */
  padding: 0;
  gap: 30px; /* 항목 간 간격 */
  margin: 0 15px;
  list-style: none; /* 점 제거 */

  @media (max-width: 744px) {
    gap: 8px;
    margin: 0;
  }
`;

const NavItem = styled.li`
  color: #4b5563;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 26px;
  cursor: pointer;

  @media (max-width: 744px) {
    font-size: 1rem;
  }
`;
