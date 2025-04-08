import { ReactNode } from "react";
import styles from './OptionItem.module.scss'

function OptionItem(): ReactNode {
  return (
    <li className={styles['item']}>
      <label className={styles['item-label']}>#1</label>
      <input
        type="text"
        className={styles['item-title']}
        name="title"
        placeholder="Enter option title"
      />
      <input
        type="number"
        className={styles['item-weight']}
        name="weight"
        placeholder="Enter weight"
      />
      <button className={styles['item-btn']}>DELETE</button>
    </li>
  );
}

export default OptionItem;