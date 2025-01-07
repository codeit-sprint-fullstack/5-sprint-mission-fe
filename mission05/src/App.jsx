import { styled } from "styled-components";
import logo from "./assets/img/logo/logo.png";
import Nav from "./components/Nav";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <Header>
        <div>
          <img src={logo} alt="판다마켓 로고 이미지" />
          <Nav />
        </div>
        <Auth />
      </Header>
      <p>header</p>
      <p>Favorites</p>
      <p>Sales</p>
    </>
  );
}

export default App;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
