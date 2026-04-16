import styled, { css } from "styled-components/native";

type SummaryCardProps = {
  isPositive: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SummaryCard = styled.View<SummaryCardProps>`
  padding: 56px 24px 28px;
  align-items: center;
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

export const SummaryValue = styled.Text`
  font-size: 40px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const SummaryText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 8px;
  margin-bottom: 20px;
`;

export const SummaryButton = styled.TouchableOpacity`
  min-width: 164px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0 18px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 8px;

  shadow-color: #000;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  elevation: 2;
`;

export const SummaryButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Content = styled.View`
  padding: 24px 24px 0;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const ActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FilterOpenButton = styled.TouchableOpacity`
  height: 46px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0 18px;
  align-items: center;
  justify-content: center;
`;

export const FilterOpenButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
`;

export const NewButton = styled.TouchableOpacity`
  height: 46px;
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0 20px;
  align-items: center;
  justify-content: center;

  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 2;
`;

export const NewButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 16px 24px 8px;
`;

export const EmptyContainer = styled.View`
  margin: 12px 24px 0;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 32px 24px;
  align-items: center;
`;

export const EmptyTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  text-align: center;
`;

export const EmptyText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 22px;
`;