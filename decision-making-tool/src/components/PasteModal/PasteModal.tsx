import { useEffect, useRef, useState } from 'react';
import type { PasteModalProps } from '../../types/types';
import styles from './PasteModal.module.scss';
import Button from '../UI/Button/Button';
import { useOptionsStore } from '../../store/useOptionsStore';

const placeholderString = `Paste a list of new options in a CSV-like format:

title,1                  → | title                  | 1 |
title with whitespaces,2 → | title with whitespaces | 2 |
title , with , commas,3  → | title , with , commas  | 3 |
title with "quotes",4    → | title with "quotes"    | 4 |
`;

function PasteModal({
  isOpen,
  onClose,
  closeOnOverlayClick = true,
}: PasteModalProps): React.ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {setOptionsFromText} = useOptionsStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const [textInput, setTextInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDialogElement>): void => {
    if (!closeOnOverlayClick) return;

    const target = e.target

    if(target === dialogRef.current) onClose()
  };

  const handleConfirm = (): void => {
    try {
      const lines = textInput.split(/\r?\n/)
      const newOptions = []
      let lastId = 0

      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i].trim()
        if (!line) continue

        const lastCommaIndex = line.lastIndexOf(',')
        if (lastCommaIndex === 1) {
          throw new Error(`Invalid format in line ${i + 1}: Missing comma`)
        }

        const title = line.slice(0, lastCommaIndex).trim()
        const weight = parseFloat(line.slice(lastCommaIndex + 1).trim())
        
        if (isNaN(weight)) {
          throw new Error(`Invalid weight in line ${i + 1}`)
        }

        newOptions.push({
          id: `#${i + 1}`,
          title,
          weight,
        })

        lastId = i + 1
      }

      if (newOptions.length === 0) {
        throw new Error('List must contain at least one valid option')
      }

      setOptionsFromText({list: newOptions, lastId})
      onClose()
      setTextInput('')
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Invalid format'
      )
      console.error(error)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles['paste-options']}
      onClick={handleOverlayClick}
      onClose={onClose}
    >
      <div className={styles['paste-options_container']} onClick={(e) => e.stopPropagation()}>
        <textarea
          ref={textareaRef}
          className={styles['paste-options_container__textarea']}
          rows={12}
          cols={60}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder={placeholderString}
        />
        <Button
          label="Confirm"
          className={[styles['paste-options_container__btn']]}
          onClick={handleConfirm}
        />
        <Button
          label="Cancel"
          className={[styles['paste-options_container__btn']]}
          onClick={onClose}
        />
        {errorMessage && (
          <p className={styles['error-message']}>{errorMessage}</p>
        )}
      </div>
    </dialog>
  );
}

export default PasteModal;
