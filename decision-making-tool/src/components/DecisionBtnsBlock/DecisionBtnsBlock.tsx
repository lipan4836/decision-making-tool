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
    </div>
  );
}

export default DecisionBtnsBlock;