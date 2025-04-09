import { useState, type ReactNode } from "react";
import { buttonsProps } from "../../data/buttonsProps";
import Button from "../UI/Button/Button";
import styles from './MainBtnsBlock.module.scss'
import { useOptionsStore } from "../../store/useOptionsStore";
import PasteModal from "../PasteModal/PasteModal";

function MainBtnsBlock(): ReactNode {
  const {addOption, downloadListJson, uploadListFromJson, clearList} = useOptionsStore()
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false)

  const buttons = buttonsProps({
    addOption,
    pasteList: () => setIsPasteModalOpen(true),
    clearList,
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
      {isPasteModalOpen && (
      <PasteModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
      />
    )}
    </div>
  );
}

export default MainBtnsBlock;