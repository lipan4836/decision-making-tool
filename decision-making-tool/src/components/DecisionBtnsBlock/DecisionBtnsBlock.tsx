import type { ReactNode } from "react";
import styles from './DecisionBtnsBlock.module.scss'
import { useNavigate } from "react-router-dom";
import Icon from "../UI/Icon/Icon";
import SoundToggle from "../UI/SoundToggle/SoundToggle";

function DecisionBtnsBlock(): ReactNode {
  const navigate = useNavigate()

  const handleNavigateToHome = (): void => {
    navigate('/')
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
          name="duration"
          className={styles['btns-block_label__input']}
          min={3}
          max={30}
          placeholder="Enter duration"
        />
      </div>
      <button className={`${styles['btns-block_btn']} ${styles.start}`}>
        <Icon idSprite="play" />
      </button>
    </div>
  );
}

export default DecisionBtnsBlock;