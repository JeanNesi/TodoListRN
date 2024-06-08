import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TodoList, CreateTodo } from "../screens";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TodoList"
    >
      <Screen name="TodoList" component={TodoList} />
      <Screen name="CreateTodo" component={CreateTodo} />
    </Navigator>
  );
}
