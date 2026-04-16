import { Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../@types/navigation";
import { mealCreate } from "../../storage/meal/mealCreate";
import { Header } from "../../components/Header";

import {
  Container,
  Content,
  Form,
  Field,
  FlexField,
  Label,
  Input,
  TextArea,
  Row,
  DietButton,
  DietText,
  SaveButton,
  SaveButtonText,
} from "./styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function NewMeal() {
  const navigation = useNavigation<NavigationProps>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isOnDiet, setIsOnDiet] = useState<boolean | null>(null);

  function formatDate(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 8);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  }

  function formatTime(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 4);

    if (numbers.length <= 2) return numbers;

    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
  }

  function isValidDate(value: string) {
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return false;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > 2100) return false;

    const dateObj = new Date(year, month - 1, day);

    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }

  function isValidTime(value: string) {
    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return false;

    const hour = Number(match[1]);
    const minute = Number(match[2]);

    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }

  async function handleCreateMeal() {
    if (
      !name.trim() ||
      !description.trim() ||
      !date.trim() ||
      !time.trim() ||
      isOnDiet === null
    ) {
      return Alert.alert("Nova refeição", "Preencha todos os campos.");
    }

    if (!isValidDate(date)) {
      return Alert.alert(
        "Data inválida",
        "Digite uma data válida no formato DD/MM/AAAA."
      );
    }

    if (!isValidTime(time)) {
      return Alert.alert(
        "Hora inválida",
        "Digite um horário válido no formato HH:MM."
      );
    }

    const newMeal = {
      id: String(new Date().getTime()),
      name: name.trim(),
      description: description.trim(),
      date: date.trim(),
      time: time.trim(),
      isOnDiet,
    };

    try {
      await mealCreate(newMeal);
      navigation.navigate("feedback", { isOnDiet });
    } catch {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  return (
    <Container>
      <Header title="Nova refeição" variant="green" />

      <Content>
        <Form>
          <Field>
            <Label>Nome</Label>
            <Input
              placeholder="Digite o nome"
              value={name}
              onChangeText={setName}
            />
          </Field>

          <Field>
            <Label>Descrição</Label>
            <TextArea
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </Field>

          <Row>
            <FlexField>
              <Label>Data</Label>
              <Input
                placeholder="DD/MM/AAAA"
                value={date}
                onChangeText={(value) => setDate(formatDate(value))}
                keyboardType="number-pad"
                maxLength={10}
              />
            </FlexField>

            <FlexField>
              <Label>Hora</Label>
              <Input
                placeholder="HH:MM"
                value={time}
                onChangeText={(value) => setTime(formatTime(value))}
                keyboardType="number-pad"
                maxLength={5}
              />
            </FlexField>
          </Row>

          <Field>
            <Label>Está dentro da dieta?</Label>

            <Row>
              <DietButton
                isActive={isOnDiet === true}
                variant="green"
                onPress={() => setIsOnDiet(true)}
              >
                <DietText>Sim</DietText>
              </DietButton>

              <DietButton
                isActive={isOnDiet === false}
                variant="red"
                onPress={() => setIsOnDiet(false)}
              >
                <DietText>Não</DietText>
              </DietButton>
            </Row>
          </Field>
        </Form>

        <SaveButton onPress={handleCreateMeal}>
          <SaveButtonText>Cadastrar refeição</SaveButtonText>
        </SaveButton>
      </Content>
    </Container>
  );
}