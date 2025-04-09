import type { ReactNode } from "react";
import type { ButtonProps } from "../../../types/types";

function Button({ label, className, onClick }: ButtonProps): ReactNode {
  const classNames = className ? className.join(' ') : ''
  return (
    <button className={classNames} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
