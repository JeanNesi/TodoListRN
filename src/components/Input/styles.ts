import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const TextInput = styled.TextInput`
  font-size: 16px;
  width: 100%;
  border: 1px solid ${theme.color.gray[400]};
  border-radius: 8px;
  padding: 16px 24px;
  color: ${theme.color.white};
`;
