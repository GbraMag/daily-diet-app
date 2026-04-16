import styled, { css } from "styled-components/native";

type Variant = "primary" | "secondary" | "outline" | "danger";

type Props = {
  variant: Variant;
};

export const Container = styled.TouchableOpacity<Props>`
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.lg};
  align-items: center;
  justify-content: center;
  padding: 0 18px;

  ${({ theme, variant }) =>
    variant === "primary" &&
    css`
      background-color: ${theme.colors.button};
    `}

  ${({ theme, variant }) =>
    variant === "secondary" &&
    css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.border};
    `}

  ${({ theme, variant }) =>
    variant === "outline" &&
    css`
      background-color: transparent;
      border: 1px solid ${theme.colors.border};
    `}

  ${({ theme, variant }) =>
    variant === "danger" &&
    css`
      background-color: ${theme.colors.redDark};
    `}
`;

export const Title = styled.Text<Props>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;

  ${({ theme, variant }) =>
    variant === "primary" &&
    css`
      color: ${theme.colors.buttonText};
    `}

  ${({ theme, variant }) =>
    variant === "secondary" &&
    css`
      color: ${theme.colors.text};
    `}

  ${({ theme, variant }) =>
    variant === "outline" &&
    css`
      color: ${theme.colors.text};
    `}

  ${({ theme, variant }) =>
    variant === "danger" &&
    css`
      color: ${theme.colors.white};
    `}
`;