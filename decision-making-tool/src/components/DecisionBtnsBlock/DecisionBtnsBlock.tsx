import type { ReactNode } from "react";
import styles from './DecisionBtnsBlock.module.scss'
import { useNavigate } from "react-router-dom";
import Icon from "../UI/Icon/Icon";
import SoundToggle from "../UI/SoundToggle/SoundToggle";
import { useWheelStore } from "../../store/useWheelStore";

function DecisionBtnsBlock(): ReactNode {
  const navigate = useNavigate()
  const {
    startSpin,
    duration,
    setDuration,
    isSpinning,
  } = useWheelStore()

  const handleNavigateToHome = (): void => {
    navigate('/')
  }

  const handleStart = (): void => {
    if (duration >= 3 && duration <= 30) startSpin()
  }

  return (
    <div className={styles['btns-block']}>
      <button
        className={`${styles['btns-block_btn']} ${styles.back}`}
        onClick={handleNavigateToHome}
      >
        <Icon idSprite="undo-2" />
      </button>
      <SoundToggle classes={`${styles['btns-block_btn']} ${styles.volume}`} />
      <div className={`${styles['btns-block_label']} ${styles.duration}`}>
        <Icon
          classes={styles['btns-block_label__svg']}
          idSprite="timer"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          name="duration"
          className={styles['btns-block_label__input']}
          min={3}
          max={30}
          placeholder="Duration (sec)"
          disabled={isSpinning}
        />
      </div>
      <button
        className={`${styles['btns-block_btn']} ${styles.start}`}
        onClick={handleStart}
      >
        <Icon idSprite="play" />
      </button>
    </div>
  );
}

export default DecisionBtnsBlock;