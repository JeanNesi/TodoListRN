import React, { useEffect, useState } from "react";
import * as S from "./styles";
import * as Icon from "phosphor-react-native";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { TodoDatabaseProps, useTodoDatabase } from "../../database";

import { Alert } from "react-native";
import { theme } from "../../styles/theme";
import { Input } from "../../components";

export const CreateTodo = () => {
  const [todo, setTodo] = useState<TodoDatabaseProps>({
    name: "",
    isCompleted: false,
  });
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const todoDatabas = useTodoDatabase();
  const params = useRoute().params as { todo: TodoDatabaseProps };

  const action = params?.todo ? "Editar" : "Adicionar";

  async function handleAddOrUpdateTask() {
    if (!todo?.name) {
      Alert.alert("Erro ao adicionar tarefa", "Nome da tarefa é obrigatório");
      return;
    }
    try {
      if (params?.todo) {
        await todoDatabas.updateName({
          id: params.todo.id,
          name: todo.name,
          isCompleted: todo.isCompleted,
        });
      } else {
        await todoDatabas.create({ name: todo.name });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao adicionar tarefa", String(error));
    }
  }

  useEffect(() => {
    if (params?.todo) setTodo(params?.todo);
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft size={24} color={theme.color.white} />
        </S.BackButton>
        <S.HeaderTitle>{action} tarefa</S.HeaderTitle>
      </S.Header>

      <Input
        value={todo.name}
        onChangeText={(text) => setTodo({ ...todo, name: text })}
        placeholder={`${action} uma tarefa`}
      />
      <S.AddButton onPress={() => handleAddOrUpdateTask()}>
        <S.AddButtonText>{action}</S.AddButtonText>
      </S.AddButton>
    </S.Container>
  );
};
