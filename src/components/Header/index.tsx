import { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  BackButton,
  BackText,
  Title,
  Spacer,
} from "./styles";

type Variant = "green" | "red" | "neutral";

type Props = {
  title: string;
  showBackButton?: boolean;
  variant?: Variant;
  rightElement?: ReactNode;
  roundedBottom?: boolean;
};

export function Header({
  title,
  showBackButton = true,
  variant = "neutral",
  rightElement,
  roundedBottom = true,
}: Props) {
  const navigation = useNavigation();

  return (
    <Container variant={variant} roundedBottom={roundedBottom}>
      {showBackButton ? (
        <BackButton onPress={() => navigation.goBack()}>
          <BackText>←</BackText>
        </BackButton>
      ) : (
        <Spacer />
      )}

      <Title>{title}</Title>

      {rightElement ? rightElement : <Spacer />}
    </Container>
  );
}