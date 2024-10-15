export interface IWinModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  nextLevel: number;
  onNextLevel: () => void;
}
