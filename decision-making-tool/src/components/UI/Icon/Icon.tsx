import type { ReactNode } from "react";
import type { IconProps } from "../../../types/types";

function Icon({idSprite, classes}: IconProps): ReactNode {
  return (
    <svg
      className={classes ? classes : ''}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <use xlinkHref={`/iconsSprite.svg#${idSprite}`} />
    </svg>
  );
}

export default Icon;