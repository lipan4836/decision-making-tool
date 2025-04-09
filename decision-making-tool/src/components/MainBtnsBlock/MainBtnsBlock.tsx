import type { ReactNode } from "react";
import { buttonsProps } from "../../data/buttonsProps";
import Button from "../UI/Button/Button";
import styles from './MainBtnsBlock.module.scss'
import { useOptionsStore } from "../../store/useOptionsStore";

function MainBtnsBlock(): ReactNode {
  const {addOption, downloadListJson, uploadListFromJson} = useOptionsStore()

  const buttons = buttonsProps({
    addOption,
    pasteList: () => console.log('Paste List'),
    clearList: () => console.log('Clear List'),
    downloadListJson,
    uploadListFromJson,
    start: () => console.log('Start'),
  })
  return (
    <div className={styles['btns-block']}>
      {
        buttons.map((buttonProps, index) => (
          <Button key={index} {...buttonProps} />
        ))
      }
    </div>
  );
}

export default MainBtnsBlock;