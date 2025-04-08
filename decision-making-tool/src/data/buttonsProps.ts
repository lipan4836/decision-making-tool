import type { ButtonProps } from '../types/types';
import styles from '../components/MainBtnsBlock/MainBtnsBlock.module.scss';

export const buttonsProps: ButtonProps[] = [
  {
    label: 'Add Option',
    className: [styles['btn']],
    onClick: () => console.log(`"Add Option" was clicked`),
  },
  {
    label: 'Paste List',
    className: [styles['btn']],
    onClick: () => console.log(`"Paste List" was clicked`),
  },
  {
    label: 'Clear List',
    className: [styles['btn']],
    onClick: () => console.log(`"Clear List" was clicked`),
  },
  {
    label: 'Save List to File',
    className: [styles['btn'], styles['short']],
    onClick: () => console.log(`"Save List to File" was clicked`),
  },
  {
    label: 'Load List to File',
    className: [styles['btn'], styles['short']],
    onClick: () => console.log(`"Load List to File" was clicked`),
  },
  {
    label: 'Start',
    className: [styles['btn']],
    onClick: () => console.log(`"Start" was clicked`),
  },
];
