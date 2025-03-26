export type ButtonOptions = {
  classes?: string[];
  content: string;
  callback?: () => void;
};

export type LabelOptions = {
  count?: string;
  classes: string[];
};

export type InputOptions = {
  type: string;
  classes: string[];
  id?: string;
  name: string;
  value?: string;
  placeholder?: string;
  min?: string;
  callback?: (event: Event) => void;
};

export type TextElOptions = {
  tag: string;
  classes: string[];
  content?: string;
};
