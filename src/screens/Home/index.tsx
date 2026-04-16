import { useCallback, useState, useRef, useEffect } from "react";
import { SectionList, Animated, Image, View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../@types/navigation";
import { Meal } from "../../types/meal";
import { mealGetAll } from "../../storage/meal/mealGetAll";
import { mealGetStatistics } from "../../storage/meal/mealGetStatistics";

import { MealCard } from "../../components/MealCard";
import { FilterModal } from "../../components/FilterModal";

import {
  Container,
  SummaryCard,
  SummaryValue,
  SummaryText,
  SummaryButton,
  SummaryButtonText,
  Content,
  HeaderRow,
  Title,
  ActionsRow,
  FilterOpenButton,
  FilterOpenButtonText,
  NewButton,
  NewButtonText,
  SectionTitle,
  EmptyContainer,
  EmptyTitle,
  EmptyText,
} from "./styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type SectionData = {
  title: string;
  data: Meal[];
};

export function Home() {
  const navigation = useNavigation<NavigationProps>();

  const [sections, setSections] = useState<SectionData[]>([]);
  const [percentage, setPercentage] = useState(0);

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "onDiet" | "offDiet"
  >("all");

  const [sortType, setSortType] = useState<"recent" | "oldest">("recent");

  const animatedPercentage = useRef(new Animated.Value(0)).current;
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const summaryOpacity = useRef(new Animated.Value(0)).current;
  const summaryTranslateY = useRef(new Animated.Value(-20)).current;

  const listOpacity = useRef(new Animated.Value(1)).current;
  const listTranslateY = useRef(new Animated.Value(0)).current;

  function animatePercentage(value: number) {
    animatedPercentage.setValue(0);

    Animated.timing(animatedPercentage, {
      toValue: value,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }

  function animateList() {
    listOpacity.setValue(0);
    listTranslateY.setValue(10);

    Animated.parallel([
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(listTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {
    const listener = animatedPercentage.addListener(({ value }) => {
      setDisplayPercentage(value);
    });

    return () => {
      animatedPercentage.removeListener(listener);
    };
  }, [animatedPercentage]);

  function formatSections(data: Meal[]) {
    const filtered = data.filter((meal) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "onDiet") return meal.isOnDiet;
      if (statusFilter === "offDiet") return !meal.isOnDiet;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();

      if (sortType === "recent") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    const grouped = sorted.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = [];
      acc[meal.date].push(meal);
      return acc;
    }, {} as Record<string, Meal[]>);

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  }

  async function loadData() {
    const data = await mealGetAll();
    const stats = await mealGetStatistics();

    setSections(formatSections(data));
    setPercentage(stats.percentage);

    animatePercentage(stats.percentage);
    animateList();
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [statusFilter, sortType])
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(summaryOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(summaryTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [summaryOpacity, summaryTranslateY]);

  const percentageFormatted = `${displayPercentage
    .toFixed(2)
    .replace(".", ",")}%`;

  const isPositive = percentage >= 50;

  return (
    <Container>
      <Animated.View
        style={{
          flex: 1,
          opacity: listOpacity,
          transform: [{ translateY: listTranslateY }],
        }}
      >
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListHeaderComponent={
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 32,
                  marginBottom: 16,
                }}
              >
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{
                    width: 28,
                    height: 28,
                    marginRight: 8,
                    resizeMode: "contain",
                  }}
                />

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#5C6265",
                    letterSpacing: 0.8,
                  }}
                >
                  DAILY DIET
                </Text>
              </View>

              <Animated.View
                style={{
                  opacity: summaryOpacity,
                  transform: [{ translateY: summaryTranslateY }],
                }}
              >
                <SummaryCard isPositive={isPositive}>
                  <SummaryValue>{percentageFormatted}</SummaryValue>

                  <SummaryText>
                    das refeições dentro da dieta
                  </SummaryText>

                  <SummaryButton
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("statistics")}
                  >
                    <SummaryButtonText>
                      Ver estatísticas
                    </SummaryButtonText>
                  </SummaryButton>
                </SummaryCard>
              </Animated.View>

              <Content>
                <HeaderRow>
                  <Title>Refeições</Title>

                  <ActionsRow>
                    <FilterOpenButton
                      onPress={() => setFilterModalVisible(true)}
                    >
                      <FilterOpenButtonText>Filtrar</FilterOpenButtonText>
                    </FilterOpenButton>

                    <NewButton
                      onPress={() => navigation.navigate("newMeal")}
                    >
                      <NewButtonText>+ Nova refeição</NewButtonText>
                    </NewButton>
                  </ActionsRow>
                </HeaderRow>
              </Content>
            </>
          }
          renderSectionHeader={({ section }) => (
            <SectionTitle>{section.title}</SectionTitle>
          )}
          renderItem={({ item, index }) => (
            <MealCard
              meal={item}
              index={index}
              onPress={() =>
                navigation.navigate("mealDetails", {
                  mealId: item.id,
                })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyTitle>Nenhuma refeição encontrada</EmptyTitle>
              <EmptyText>Cadastre sua primeira refeição</EmptyText>
            </EmptyContainer>
          }
        />
      </Animated.View>

      <FilterModal
        visible={filterModalVisible}
        selected={statusFilter}
        selectedSort={sortType}
        onClose={() => setFilterModalVisible(false)}
        onSelect={setStatusFilter}
        onSelectSort={setSortType}
        onApply={() => {
          setFilterModalVisible(false);
          animateList();
        }}
        onClear={() => {
          setStatusFilter("all");
          setSortType("recent");
        }}
      />
    </Container>
  );
}