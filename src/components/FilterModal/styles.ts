import styled, { css } from "styled-components/native";

type OptionProps = {
  isActive: boolean;
  variant: "neutral" | "green" | "red";
};

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.38);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 28px;

  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 14px;
  elevation: 4;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
`;

export const CloseText = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SectionTitle = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const OptionsContainer = styled.View`
  gap: 12px;
  margin-bottom: 28px;
`;

export const OptionButton = styled.TouchableOpacity<OptionProps>`
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray300};
  justify-content: center;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ isActive, variant, theme }) =>
    isActive &&
    variant === "neutral" &&
    css`
      background-color: ${theme.colors.gray100};
      border-color: ${theme.colors.gray200};
    `}

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

export const OptionText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const ClearButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  border-radius: ${({ theme }) => theme.radius.md};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray300};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ClearButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const ApplyButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  border-radius: ${({ theme }) => theme.radius.md};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.button};
`;

export const ApplyButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.buttonText};
`;