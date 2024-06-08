import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import * as S from "./styles";
import * as Icons from "phosphor-react-native";
import {
  TodoDatabaseProps,
  useTodoDatabase,
} from "../../database/useTodoDatabase";
import { theme } from "../../styles/theme";
import { Input } from "../../components";

export const TodoList = () => {
  const todoDatabase = useTodoDatabase();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<TodoDatabaseProps[]>([]);

  const [search, setSearch] = useState("");
  const filteredTodo = todoList.filter((todo) =>
    todo?.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const numberOfCompletedTodo = filteredTodo.filter(
    (todo) => todo?.isCompleted
  ).length;

  async function changeTodoStatus(todoId: number) {
    try {
      const findedTodo = todoList.find((todo) => todo?.id === todoId);

      if (!findedTodo) {
        throw new Error("Todo not found");
      }

      const updatedTodo = {
        ...findedTodo,
        isCompleted: !findedTodo?.isCompleted,
      };

      await todoDatabase.updateStatus(updatedTodo);

      setTodoList((prevState) =>
        prevState.map((todo) =>
          todo?.id === todoId
            ? { ...todo, isCompleted: !todo?.isCompleted }
            : todo
        )
      );
    } catch (error) {
      Alert.alert("Erro ao atualizar tarefa", String(error));
    }
  }

  async function listTodo() {
    try {
      const response = await todoDatabase.findMany();
      setTodoList(response);
    } catch (error) {
      Alert.alert("Erro ao listar tarefas", String(error));
    } finally {
      setLoading(false);
    }
  }

  async function removeTodo(todoId: number) {
    try {
      await todoDatabase.remove(todoId);
      setTodoList(todoList.filter((todo) => todo?.id !== todoId));
    } catch (error) {
      Alert.alert("Erro ao remover tarefa", String(error));
    }
  }

  async function removeTodoAlert(todoId: number) {
    Alert.alert("Remover tarefa", "Deseja realmente remover esta tarefa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: () => removeTodo(todoId),
      },
    ]);
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      listTodo();
    });
  }, [navigation]);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Lista de tarefas</S.HeaderTitle>
        <S.RighSide>
          <S.TodoCount>Concluídas</S.TodoCount>
          <S.CountWrapper>
            {numberOfCompletedTodo} de {filteredTodo.length}
          </S.CountWrapper>
        </S.RighSide>
      </S.Header>

      <Input
        value={search}
        placeholder="Buscar tarefa"
        onChangeText={(text) => setSearch(text)}
      />

      {loading && <S.Loading />}

      {!loading && (
        <FlatList
          data={filteredTodo}
          keyExtractor={(item) => (item.id ? item?.id.toString() : "")}
          renderItem={({ item }) => (
            <S.TodoItem
              onPress={() => navigation.navigate("CreateTodo", { todo: item })}
            >
              <S.TodoLeftContainer>
                <Checkbox
                  value={Boolean(item?.isCompleted)}
                  onValueChange={() => changeTodoStatus(item.id ?? 0)}
                  color={
                    Boolean(item?.isCompleted)
                      ? theme.color.green[500]
                      : undefined
                  }
                  style={{
                    borderColor: Boolean(item?.isCompleted)
                      ? theme.color.green[500]
                      : "#ccc",
                  }}
                />
                <S.TodoText
                  style={{
                    textDecorationLine: Boolean(item?.isCompleted)
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item?.name}
                </S.TodoText>
              </S.TodoLeftContainer>

              <S.EventButton onPress={() => removeTodoAlert(item?.id ?? 0)}>
                <Icons.Trash size={24} color={theme.color.red[500]} />
              </S.EventButton>
            </S.TodoItem>
          )}
        />
      )}
      <S.AddButton onPress={() => navigation.navigate("CreateTodo")}>
        <Icons.Plus size={24} color={"#fff"} weight="bold" />
      </S.AddButton>
    </S.Container>
  );
};
