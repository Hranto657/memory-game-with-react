import { ReactNode } from 'react';

export interface IModalItemProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}
