export type InputProps = {
  type?: string;
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
  id?: string;
  name?: string;
  modelValue?: string;
  placeholder?: string;
  min?: string;
};

export type LabelProps = {
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
};

export type TextProps = {
  tag?: string;
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
  content?: string;
};

export type ButtonProps = {
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
  content?: string;
};
