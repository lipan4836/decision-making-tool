import type { ReactNode} from "react";
import { useEffect, useRef } from "react";
import styles from './ErrorModal.module.scss'
import type { ErrorModalProps } from "../../../types/types";

function ErrorModal({
  isOpen,
  onClose,
  closeOnOverlayClick,
  message
}: ErrorModalProps): ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDialogElement>): void => {
    if (!closeOnOverlayClick) return;

    const target = e.target

    if(target === dialogRef.current) onClose()
  };

  return (
    <dialog ref={dialogRef} className={styles['error-modal']} onClick={handleOverlayClick} onClose={onClose}>
      <div className={styles['error-modal_container']} onClick={(e) => e.stopPropagation()}>
        <p className={styles['error-modal_container__msg']}>{message}</p>
        <button className={styles['error-modal_container__btn']} onClick={onClose}>OK, got it now</button>
      </div>
    </dialog>
  );
}

export default ErrorModal;
