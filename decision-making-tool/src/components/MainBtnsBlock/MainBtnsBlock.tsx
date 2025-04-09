import { useState, type ReactNode } from "react";
import { buttonsProps } from "../../data/buttonsProps";
import Button from "../UI/Button/Button";
import styles from './MainBtnsBlock.module.scss'
import { useOptionsStore } from "../../store/useOptionsStore";
import PasteModal from "../PasteModal/PasteModal";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

function MainBtnsBlock(): ReactNode {
  const {list, addOption, downloadListJson, uploadListFromJson, clearList} = useOptionsStore()
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const validateOptions = (): boolean => {
    const invalidOptions = list.filter(option => 
      option.title.trim() === '' || 
      option.weight === null
    );

    if (invalidOptions.length > 0) {
      setErrorMessage(
        `Please complete all options:\n\n${
          invalidOptions.map(opt => 
            `Option ${opt.id}: ${opt.title || 'No title'}, ${opt.weight || 'No weight'}`
          ).join('\n')
        }`
      );
      return false;
    }
    return true;
  };

  const handleStart = (): void => {
    if (!validateOptions()) {
      setIsErrorModalOpen(true)
      return
    }

    navigate('/decision-page')
  }

  const buttons = buttonsProps({
    addOption,
    pasteList: () => setIsPasteModalOpen(true),
    clearList,
    downloadListJson,
    uploadListFromJson,
    start: handleStart,
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
      {isErrorModalOpen && (
        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          closeOnOverlayClick={true}
          message={errorMessage}
        />
      )}
    </div>
  );
}

export default MainBtnsBlock;