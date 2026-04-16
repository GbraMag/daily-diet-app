import { Animated } from "react-native";
import { useEffect, useRef } from "react";

import { Meal } from "../../types/meal";
import { Container, Time, Divider, Title, Status } from "./styles";

type Props = {
  meal: Meal;
  onPress: () => void;
  index?: number; 
};

export function MealCard({ meal, onPress, index = 0 }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: index * 60, 
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        delay: index * 60, 
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handlePressIn() {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  }

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      <Container
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Time>{meal.time}</Time>

        <Divider />

        <Title numberOfLines={1}>{meal.name}</Title>

        <Status isOnDiet={meal.isOnDiet} />
      </Container>
    </Animated.View>
  );
}