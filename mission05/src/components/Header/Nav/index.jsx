import styled from "styled-components";

const navItem = ["자유게시판", "중고마켓"];

export default function Nav() {
  return (
    <NavWrapper>
      <NavList>
        {navItem.map((item, idx) => (
          <NavItem key={idx}>{item}</NavItem>
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
