import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { RootStackParamList } from "../../@types/navigation";

import {
  Container,
  Content,
  Title,
  Description,
  Bold,
  Button,
  ButtonText,
} from "./styles";

import { Feather } from "@expo/vector-icons";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type FeedbackRouteProps = RouteProp<RootStackParamList, "feedback">;

export function Feedback() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<FeedbackRouteProps>();

  const { isOnDiet } = route.params;

  // 🔥 animações
  const iconScale = useRef(new Animated.Value(0.8)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      // ícone primeiro
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 8,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      // depois texto
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Container>
      <Content>
        {/* 🔥 ÍCONE ANIMADO */}
        <Animated.View
          style={{
            transform: [{ scale: iconScale }],
            opacity: iconOpacity,
            marginBottom: 28,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              backgroundColor: isOnDiet ? "#E8F5E0" : "#FDEAEA",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather
              name={isOnDiet ? "award" : "slash"}
              size={52}
              color={isOnDiet ? "#5F8F36" : "#D46A73"}
            />
          </View>
        </Animated.View>

        {/* 🔥 TEXTO ANIMADO */}
        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslateY }],
            alignItems: "center",
          }}
        >
          <Title isOnDiet={isOnDiet}>
            {isOnDiet ? "Continue assim!" : "Que pena!"}
          </Title>

          <Description>
            {isOnDiet ? (
              <>
                Você continua <Bold>dentro da dieta</Bold>. Muito bem!
              </>
            ) : (
              <>
                Você <Bold>saiu da dieta</Bold> dessa vez, mas continue se
                esforçando e não desista!
              </>
            )}
          </Description>
        </Animated.View>
      </Content>

      {/* 🔥 BOTÃO FIXO EMBAIXO */}
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate("home")}
      >
        <ButtonText>Ir para a página inicial</ButtonText>
      </Button>
    </Container>
  );
}