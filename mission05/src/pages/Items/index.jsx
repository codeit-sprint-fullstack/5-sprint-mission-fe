import styled from "styled-components";
import Favorites from "../../components/Favorites";
import Sales from "../../components/Sales";

export default function Items() {
  return (
    <Main>
      <Favorites />
      <Sales />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;
  margin-bottom: 135px;
  padding: 0 24px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 744px) {
    padding: 0 16px;
    gap: 24px;
  }
`;
