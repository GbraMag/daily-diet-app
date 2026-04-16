import { useCallback, useState, useRef, useEffect } from "react";
import { ActivityIndicator, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { mealGetStatistics } from "../../storage/meal/mealGetStatistics";
import { Header } from "../../components/Header";

import {
  Container,
  LoadingContainer,
  TopBox,
  Percentage,
  Subtitle,
  Content,
  SectionTitle,
  Card,
  SmallCard,
  CardGreen,
  CardRed,
  CardValue,
  CardText,
  Row,
} from "./styles";

type StatisticsData = {
  total: number;
  onDiet: number;
  offDiet: number;
  percentage: number;
  bestSequence: number;
};

export function Statistics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatisticsData>({
    total: 0,
    onDiet: 0,
    offDiet: 0,
    percentage: 0,
    bestSequence: 0,
  });

  const animatedPercentage = useRef(new Animated.Value(0)).current;
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const listener = animatedPercentage.addListener(({ value }) => {
      setDisplayPercentage(value);
    });

    return () => {
      animatedPercentage.removeListener(listener);
    };
  }, []);

  function animatePercentage(value: number) {
    animatedPercentage.setValue(0);

    Animated.timing(animatedPercentage, {
      toValue: value,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }

  const loadStatistics = useCallback(async () => {
    setLoading(true);

    const stats = await mealGetStatistics();
    setData(stats);

    animatePercentage(stats.percentage);

    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [loadStatistics])
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    );
  }

  const percentageFormatted = `${displayPercentage
    .toFixed(2)
    .replace(".", ",")}%`;

  const isGood = data.percentage >= 50;

  return (
    <Container>
      <Header
        title="Estatísticas"
        variant={isGood ? "green" : "red"}
        roundedBottom={false}
      />

      <TopBox isPositive={isGood}>
        <Percentage>{percentageFormatted}</Percentage>
        <Subtitle>das refeições dentro da dieta</Subtitle>
      </TopBox>

      <Content>
        <SectionTitle>Estatísticas gerais</SectionTitle>

        <Card>
          <CardValue>{data.bestSequence}</CardValue>
          <CardText>
            melhor sequência de pratos dentro da dieta
          </CardText>
        </Card>

        <Card>
          <CardValue>{data.total}</CardValue>
          <CardText>refeições registradas</CardText>
        </Card>

        <Row>
          <SmallCard as={CardGreen}>
            <CardValue>{data.onDiet}</CardValue>
            <CardText>refeições dentro da dieta</CardText>
          </SmallCard>

          <SmallCard as={CardRed}>
            <CardValue>{data.offDiet}</CardValue>
            <CardText>refeições fora da dieta</CardText>
          </SmallCard>
        </Row>
      </Content>
    </Container>
  );
}