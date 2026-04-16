import styled, { css } from "styled-components/native";

type DietButtonProps = {
  isActive: boolean;
  variant: "green" | "red";
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
  margin-top: 8px;
  justify-content: space-between;
`;

export const Form = styled.View`
  gap: 20px;
`;

export const Field = styled.View`
  gap: 6px;
`;

export const FlexField = styled(Field)`
  flex: 1;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.TextInput`
  height: 52px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const TextArea = styled(Input)`
  min-height: 110px;
  height: 110px;
  padding: 14px 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const DietButton = styled.TouchableOpacity<DietButtonProps>`
  flex: 1;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray200};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ isActive, variant, theme }) =>
    isActive &&
    variant === "green" &&
    css`
      background-color: ${theme.colors.greenMid};
      border-color: ${theme.colors.greenDark};
    `}

  ${({ isActive, variant, theme }) =>
    isActive &&
    variant === "red" &&
    css`
      background-color: ${theme.colors.redMid};
      border-color: ${theme.colors.redDark};
    `}
`;

export const DietText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const SaveButton = styled.TouchableOpacity`
  height: 54px;
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.radius.lg};
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const SaveButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
`;