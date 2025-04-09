export interface Option {
  id: string;
  title: string;
  weight: number | null;
}

export interface OptionsList {
  list: Option[];
  lastId: number;
}

export interface ButtonProps {
  label: string;
  className?: string[];
  onClick: () => void;
}
