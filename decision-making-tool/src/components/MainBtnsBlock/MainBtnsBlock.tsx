import { ReactNode } from "react";
import { buttonsProps } from "../../data/buttonsProps";
import Button from "../UI/Button/Button";
import styles from './MainBtnsBlock.module.scss'

function MainBtnsBlock(): ReactNode {
  return (
    <div className={styles['btns-block']}>
      {
        buttonsProps.map((buttonProps, index) => (
          <Button key={index} {...buttonProps} />
        ))
      }
    </div>
  );
}

export default MainBtnsBlock;