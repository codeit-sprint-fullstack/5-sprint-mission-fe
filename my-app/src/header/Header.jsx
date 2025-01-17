import { Title } from "./title/Title.jsx";
import { Login } from "./login/Login.jsx";
import "./header.css";
export function Header() {
  return (
    <div id="header">
      <Title />
      <Login />
    </div>
  );
}
