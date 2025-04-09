import type { ButtonProps } from '../types/types';
import styles from '../components/MainBtnsBlock/MainBtnsBlock.module.scss';

export const buttonsProps = (handlers: {
  addOption: () => void;
  pasteList: () => void;
  clearList: () => void;
  downloadListJson: () => void;
  uploadListFromJson: () => void;
  start: () => void;
}): ButtonProps[] => [
  {
    label: 'Add Option',
    className: [styles['btn']],
    onClick: handlers.addOption,
  },
  {
    label: 'Paste List',
    className: [styles['btn']],
    onClick: handlers.pasteList,
  },
  {
    label: 'Clear List',
    className: [styles['btn']],
    onClick: handlers.clearList,
  },
  {
    label: 'Save List to File',
    className: [styles['btn'], styles['short']],
    onClick: handlers.downloadListJson,
  },
  {
    label: 'Load List to File',
    className: [styles['btn'], styles['short']],
    onClick: handlers.uploadListFromJson,
  },
  {
    label: 'Start',
    className: [styles['btn']],
    onClick: handlers.start,
  },
];
