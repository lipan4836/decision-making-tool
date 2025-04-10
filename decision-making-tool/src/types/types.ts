export interface Option {
  id: string;
  title: string;
  weight: number | null;
}

export interface OptionsList {
  list: Option[];
  lastId: number;
}

export interface PasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
}

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  message: string;
}

export interface ButtonProps {
  label: string;
  className?: string[];
  onClick: () => void;
}

export interface IconProps {
  idSprite: string;
  classes?: string;
}
