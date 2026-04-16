import { Modal, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

import {
  Overlay,
  Container,
  Header,
  Title,
  CloseButton,
  CloseText,
  SectionTitle,
  OptionsContainer,
  OptionButton,
  OptionText,
  Footer,
  ClearButton,
  ClearButtonText,
  ApplyButton,
  ApplyButtonText,
} from "./styles";

export type FilterType = "all" | "onDiet" | "offDiet";
export type SortType = "recent" | "oldest";

type Props = {
  visible: boolean;
  selected: FilterType;
  selectedSort: SortType;
  onClose: () => void;
  onSelect: (value: FilterType) => void;
  onSelectSort: (value: SortType) => void;
  onApply: () => void;
  onClear: () => void;
};

export function FilterModal({
  visible,
  selected,
  selectedSort,
  onClose,
  onSelect,
  onSelectSort,
  onApply,
  onClear,
}: Props) {
  const [shouldRender, setShouldRender] = useState(visible);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (shouldRender) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.96,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, opacity, translateY, scale, shouldRender]);

  function handleClose() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 20,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShouldRender(false);
      onClose();
    });
  }

  if (!shouldRender) return null;

  return (
    <Modal visible transparent animationType="none">
      <Overlay>
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY }, { scale }],
            width: "100%",
          }}
        >
          <Container>
            <Header>
              <Title>Filtrar refeições</Title>

              <CloseButton onPress={handleClose}>
                <CloseText>×</CloseText>
              </CloseButton>
            </Header>

            <SectionTitle>Status</SectionTitle>

            <OptionsContainer>
              <OptionButton
                activeOpacity={0.9}
                isActive={selected === "all"}
                variant="neutral"
                onPress={() => onSelect("all")}
              >
                <OptionText>Todas</OptionText>
              </OptionButton>

              <OptionButton
                activeOpacity={0.9}
                isActive={selected === "onDiet"}
                variant="green"
                onPress={() => onSelect("onDiet")}
              >
                <OptionText>Dentro da dieta</OptionText>
              </OptionButton>

              <OptionButton
                activeOpacity={0.9}
                isActive={selected === "offDiet"}
                variant="red"
                onPress={() => onSelect("offDiet")}
              >
                <OptionText>Fora da dieta</OptionText>
              </OptionButton>
            </OptionsContainer>

            <SectionTitle>Ordenação</SectionTitle>

            <OptionsContainer>
              <OptionButton
                activeOpacity={0.9}
                isActive={selectedSort === "recent"}
                variant="neutral"
                onPress={() => onSelectSort("recent")}
              >
                <OptionText>Mais recente</OptionText>
              </OptionButton>

              <OptionButton
                activeOpacity={0.9}
                isActive={selectedSort === "oldest"}
                variant="neutral"
                onPress={() => onSelectSort("oldest")}
              >
                <OptionText>Mais antigo</OptionText>
              </OptionButton>
            </OptionsContainer>

            <Footer>
              <ClearButton activeOpacity={0.9} onPress={onClear}>
                <ClearButtonText>Limpar</ClearButtonText>
              </ClearButton>

              <ApplyButton activeOpacity={0.9} onPress={onApply}>
                <ApplyButtonText>Aplicar</ApplyButtonText>
              </ApplyButton>
            </Footer>
          </Container>
        </Animated.View>
      </Overlay>
    </Modal>
  );
}