import type { ReactNode } from "react";
import type { IconProps } from "../../../types/types";

function Icon({idSprite}: IconProps): ReactNode {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <use xlinkHref={`/iconsSprite.svg#${idSprite}`} />
    </svg>
  );
}

export default Icon;