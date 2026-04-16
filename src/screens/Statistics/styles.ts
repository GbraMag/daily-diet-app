import styled, { css } from "styled-components/native";

type TopBoxProps = {
  isPositive: boolean;
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

export const TopBox = styled.View<TopBoxProps>`
  align-items: center;
  padding: 12px 24px 28px;
  border-bottom-left-radius: ${({ theme }) => theme.radius.xxl};
  border-bottom-right-radius: ${({ theme }) => theme.radius.xxl};

  ${({ isPositive, theme }) =>
    isPositive
      ? css`
          background-color: ${theme.colors.greenLight};
        `
      : css`
          background-color: ${theme.colors.redLight};
        `}
`;

export const Percentage = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Content = styled.View`
  flex: 1;
  padding: 28px 24px;
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 22px 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const SmallCard = styled(Card)`
  flex: 1;
  margin-bottom: 0;
`;

export const CardGreen = styled(Card)`
  background-color: ${({ theme }) => theme.colors.greenMid};
`;

export const CardRed = styled(Card)`
  background-color: ${({ theme }) => theme.colors.redMid};
`;

export const CardValue = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm};
`;