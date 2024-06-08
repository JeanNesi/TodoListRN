import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/database/initializeDatabase";
import { theme } from "./src/styles/theme";

export default function App() {
  return (
    <SQLiteProvider databaseName="todo.db" onInit={initializeDatabase}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: theme.color.gray[950] }}
        >
          <Routes />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
