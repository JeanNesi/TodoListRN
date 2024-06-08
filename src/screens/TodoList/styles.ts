import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.color.green[500]};
`;

export const RighSide = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TodoCount = styled.Text`
  font-size: 16px;
  color: ${theme.color.green[600]};
`;

export const CountWrapper = styled.Text`
  padding: 2px 8px;
  background: ${theme.color.gray[800]};
  border-radius: 8px;
  color: ${theme.color.white};
  font-weight: 700;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: "large",
  color: "${theme.color.green[500]}",
})`
  margin-top: 20px;
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: ${theme.color.green[500]};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const TodoItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${theme.color.gray[800]};
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.color.gray[600]};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TodoLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TodoText = styled.Text`
  font-size: 16px;
  color: ${theme.color.white};
  margin-left: 10px;
  max-width: 80%;
`;

export const EventButton = styled.Pressable``;
