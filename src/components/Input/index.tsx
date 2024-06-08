import { TextInputProps } from "react-native";
import * as S from "./styles";
import { theme } from "../../styles/theme";

export const Input = ({ ...rest }: TextInputProps) => {
  return <S.TextInput placeholderTextColor={theme.color.gray[500]} {...rest} />;
};
