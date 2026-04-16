import { TouchableOpacityProps, Animated } from "react-native";
import { useRef } from "react";

import { Container, Title } from "./styles";

type Variant = "primary" | "secondary" | "outline" | "danger";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: Variant;
};

export function Button({
  title,
  variant = "primary",
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePressIn(e: any) {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();

    onPressIn?.(e);
  }

  function handlePressOut(e: any) {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();

    onPressOut?.(e);
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Container
        activeOpacity={0.9}
        variant={variant}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...rest}
      >
        <Title variant={variant}>{title}</Title>
      </Container>
    </Animated.View>
  );
}