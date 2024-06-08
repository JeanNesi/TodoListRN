import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { StackRoutes } from "./StackRoutes";
import { theme } from "../styles/theme";

export function Routes() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color.gray[950],
        },
      }}
    >
      <StackRoutes />
    </NavigationContainer>
  );
}

export default Routes;
