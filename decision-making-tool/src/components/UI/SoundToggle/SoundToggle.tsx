import type { ReactNode } from "react";
import { useSoundStore } from "../../../store/useSoundStore";
import Icon from "../Icon/Icon";

type SoundToggleProps = {
  classes: string | string[]
}

function SoundToggle({classes}: SoundToggleProps): ReactNode {
  const {isMuted, toggleMute} = useSoundStore()

  const buttonClasses = Array.isArray(classes)
    ? classes.join(' ')
    : classes

  return (
    <button
      className={buttonClasses}
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        <Icon idSprite="volume-off" />
      ) : (
        <Icon idSprite="volume-2" />
      )}
    </button>
  );
}

export default SoundToggle;