import { Alert, ActivityIndicator } from "react-native";
import { useCallback, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../@types/navigation";
import { Meal } from "../../types/meal";
import { mealGetById } from "../../storage/meal/mealGetById";
import { mealUpdate } from "../../storage/meal/mealupdate";
import { Header } from "../../components/Header";

import {
  Container,
  LoadingContainer,
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
import { lightTheme } from "../../theme";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type EditMealRouteProps = RouteProp<RootStackParamList, "editMeal">;

export function EditMeal() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<EditMealRouteProps>();

  const { mealId } = route.params;

  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState<Meal | null>(null);

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

  async function loadMeal() {
    try {
      setLoading(true);

      const data = await mealGetById(mealId);

      if (!data) {
        Alert.alert("Editar refeição", "Refeição não encontrada.");
        navigation.navigate("home");
        return;
      }

      setMeal(data);
      setName(data.name);
      setDescription(data.description);
      setDate(data.date);
      setTime(data.time);
      setIsOnDiet(data.isOnDiet);
    } catch {
      Alert.alert("Editar refeição", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadMeal();
    }, [mealId])
  );

  async function handleUpdateMeal() {
    if (!meal) return;

    if (
      !name.trim() ||
      !description.trim() ||
      !date.trim() ||
      !time.trim() ||
      isOnDiet === null
    ) {
      return Alert.alert("Editar refeição", "Preencha todos os campos.");
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

    const updatedMeal: Meal = {
      id: meal.id,
      name: name.trim(),
      description: description.trim(),
      date: date.trim(),
      time: time.trim(),
      isOnDiet,
    };

    try {
      await mealUpdate(updatedMeal);
      navigation.replace("mealDetails", { mealId: meal.id });
    } catch {
      Alert.alert("Editar refeição", "Não foi possível atualizar.");
    }
  }

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={lightTheme.colors.greenDark} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header title="Editar refeição" variant="green" />

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

        <SaveButton onPress={handleUpdateMeal}>
          <SaveButtonText>Salvar alterações</SaveButtonText>
        </SaveButton>
      </Content>
    </Container>
  );
}