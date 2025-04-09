import { useEffect, useRef } from 'react';
import type { PasteModalProps } from '../../types/types';
import styles from './PasteModal.module.scss';
import Button from '../UI/Button/Button';

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

  return (
    <dialog
      ref={dialogRef}
      className={styles['paste-options']}
      onClick={handleOverlayClick}
      onClose={onClose}
    >
      <div className={styles['paste-options_container']} onClick={(e) => e.stopPropagation()}>
        <textarea
          className={styles['paste-options_container__textarea']}
          rows={12}
          cols={60}
          placeholder={placeholderString}
        />
        <Button
          label="Confirm"
          className={[styles['paste-options_container__btn']]}
          onClick={() => console.log('confirm')}
        />
        <Button
          label="Cancel"
          className={[styles['paste-options_container__btn']]}
          onClick={onClose}
        />
      </div>
    </dialog>
  );
}

export default PasteModal;
