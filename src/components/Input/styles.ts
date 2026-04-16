import styled, { css } from "styled-components/native";

type InputProps = {
  isFocused: boolean;
};

export const Container = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const InputField = styled.TextInput<InputProps>`
  width: 100%;
  height: 52px;
  border-width: 1px;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0 14px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};

  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.greenDark : theme.colors.gray200};

  ${({ multiline }) =>
    multiline &&
    css`
      height: 120px;
      padding-top: 14px;
      shadow-color: #000;
      shadow-opacity: 0.05;
      shadow-radius: 6px;
      elevation: 2;
    `}
`;