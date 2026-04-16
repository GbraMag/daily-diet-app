import styled, { css } from "styled-components/native";

type TitleProps = {
  isOnDiet: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
  align-items: center;
  padding: 120px 24px 40px;
`;

export const Content = styled.View`
  align-items: center;
`;

export const Title = styled.Text<TitleProps>`
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: 900;
  text-align: center;
  margin-bottom: 12px;

  ${({ isOnDiet, theme }) =>
    isOnDiet
      ? css`
          color: ${theme.colors.greenDark};
        `
      : css`
          color: ${theme.colors.redDark};
        `}
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 26px;
  max-width: 300px;
`;

export const Bold = styled.Text`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.TouchableOpacity`
  min-height: 54px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.radius.lg};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
`;