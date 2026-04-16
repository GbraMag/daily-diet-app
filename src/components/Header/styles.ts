import styled, { css } from "styled-components/native";

type Variant = "green" | "red" | "neutral";

type Props = {
  variant: Variant;
  roundedBottom: boolean;
};

export const Container = styled.View<Props>`
  height: 112px;
  padding: 52px 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${({ roundedBottom, theme }) =>
    roundedBottom &&
    css`
      border-bottom-left-radius: ${theme.radius.xxl};
      border-bottom-right-radius: ${theme.radius.xxl};
    `}

  ${({ theme, variant }) =>
    variant === "green" &&
    css`
      background-color: ${theme.colors.greenLight};
    `}

  ${({ theme, variant }) =>
    variant === "red" &&
    css`
      background-color: ${theme.colors.redLight};
    `}

  ${({ theme, variant }) =>
    variant === "neutral" &&
    css`
      background-color: ${theme.colors.gray100};
    `}
`;

export const BackButton = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
`;

export const BackText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const Spacer = styled.View`
  width: 34px;
  height: 34px;
`;