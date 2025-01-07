import styled from "styled-components";

export default function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.p`
  color: #111827;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 32px;
`;
