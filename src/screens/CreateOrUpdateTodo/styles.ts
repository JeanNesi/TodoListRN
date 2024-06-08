import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const BackButton = styled.Pressable`
  padding: 8px;
  margin: -8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-left: 16px;
  color: ${theme.color.white};
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${theme.color.green[500]};
  padding: 16px 24px;
  border-radius: 8px;
  align-items: center;
  margin-top: auto;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
