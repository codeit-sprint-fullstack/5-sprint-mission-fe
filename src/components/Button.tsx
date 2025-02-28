import styled from "styled-components";
import { colors } from "../assets/theme";

const Button = styled.button`
  height: 100%px;
  padding: 8px 23px;
  font-size: 16px;
  font-weight: Semibold;
  background-color: ${colors.buttonBlue};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Button;
