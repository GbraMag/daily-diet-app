import { useCallback, useState } from "react";
import { ActivityIndicator, Modal } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../@types/navigation";
import { Meal } from "../../types/meal";
import { mealGetById } from "../../storage/meal/mealGetById";
import { mealRemove } from "../../storage/meal/mealRemove";
import { Header } from "../../components/Header";

import {
  Container,
  LoadingContainer,
  Content,
  Title,
  Description,
  Label,
  Info,
  StatusBox,
  StatusDot,
  StatusText,
  Actions,
  EditButton,
  EditButtonText,
  DeleteButton,
  DeleteButtonText,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButtons,
  ModalCancelButton,
  ModalCancelText,
  ModalDeleteButton,
  ModalDeleteText,
} from "./styles";
import { lightTheme } from "../../theme";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type MealDetailsRouteProps = RouteProp<RootStackParamList, "mealDetails">;

export function MealDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<MealDetailsRouteProps>();

  const { mealId } = route.params;

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function loadMeal() {
    try {
      setLoading(true);

      const data = await mealGetById(mealId);

      if (!data) {
        navigation.navigate("home");
        return;
      }

      setMeal(data);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadMeal();
    }, [mealId])
  );

  async function handleRemoveMeal() {
    await mealRemove(mealId);
    setShowDeleteModal(false);
    navigation.navigate("home");
  }

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={lightTheme.colors.greenDark} />
      </LoadingContainer>
    );
  }

  if (!meal) return null;

  return (
    <>
      <Container>
        <Header
          title="Refeição"
          variant={meal.isOnDiet ? "green" : "red"}
        />

        <Content>
          <Title>{meal.name}</Title>

          <Description>{meal.description}</Description>

          <Label>Data e hora</Label>
          <Info>
            {meal.date} às {meal.time}
          </Info>

          <StatusBox>
            <StatusDot isOnDiet={meal.isOnDiet} />
            <StatusText>
              {meal.isOnDiet ? "dentro da dieta" : "fora da dieta"}
            </StatusText>
          </StatusBox>

          <Actions>
            <EditButton
              onPress={() =>
                navigation.navigate("editMeal", { mealId })
              }
            >
              <EditButtonText>Editar refeição</EditButtonText>
            </EditButton>

            <DeleteButton onPress={() => setShowDeleteModal(true)}>
              <DeleteButtonText>Excluir refeição</DeleteButtonText>
            </DeleteButton>
          </Actions>
        </Content>
      </Container>

      <Modal visible={showDeleteModal} transparent animationType="fade">
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Excluir refeição</ModalTitle>

            <ModalText>
              Deseja realmente excluir esta refeição?
            </ModalText>

            <ModalButtons>
              <ModalCancelButton onPress={() => setShowDeleteModal(false)}>
                <ModalCancelText>Cancelar</ModalCancelText>
              </ModalCancelButton>

              <ModalDeleteButton onPress={handleRemoveMeal}>
                <ModalDeleteText>Sim, excluir</ModalDeleteText>
              </ModalDeleteButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}