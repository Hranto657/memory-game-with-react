import { ReactNode } from 'react';

export interface IModalItemProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
