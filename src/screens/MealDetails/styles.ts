import styled, { css } from "styled-components/native";

type StatusProps = {
  isOnDiet: boolean;
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
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 24px;
  margin-bottom: 28px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 28px;
`;

export const StatusBox = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  align-self: flex-start;
`;

export const StatusDot = styled.View<StatusProps>`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-right: 8px;

  ${({ isOnDiet, theme }) =>
    isOnDiet
      ? css`
          background-color: ${theme.colors.greenDark};
        `
      : css`
          background-color: ${theme.colors.redDark};
        `}
`;

export const StatusText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.View`
  margin-top: auto;
  gap: 12px;
`;

export const EditButton = styled.TouchableOpacity`
  height: 54px;
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.radius.lg};
  align-items: center;
  justify-content: center;
`;

export const EditButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
`;

export const DeleteButton = styled.TouchableOpacity`
  height: 54px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const DeleteButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.38);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const ModalContent = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 24px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

export const ModalText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 22px;
  margin-bottom: 24px;
`;

export const ModalButtons = styled.View`
  gap: 12px;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ModalCancelText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalDeleteButton = styled.TouchableOpacity`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.redDark};
  border-radius: ${({ theme }) => theme.radius.md};
  align-items: center;
  justify-content: center;
`;

export const ModalDeleteText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.white};
`;