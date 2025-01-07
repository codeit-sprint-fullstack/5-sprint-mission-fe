import styled from "styled-components";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import Sales from "./components/Sales";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Favorites />
        <Sales />
      </Main>
    </>
  );
}

export default App;

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
