import type { ReactNode } from "react";
import styles from './OptionItem.module.scss'
import type { Option } from "../../types/types";
import { useOptionsStore } from "../../store/useOptionsStore";

function OptionItem({id, title, weight}: Option): ReactNode {
  const updateOption = useOptionsStore((state) => state.updateOption)
  const removeOption = useOptionsStore((state) => state.removeOption)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateOption(id, event.target.value, weight)
  }

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newWeight = event.target.value ? Number(event.target.value) : null
    updateOption(id, title, newWeight)
  }

  const handleDelete = (): void => {
    removeOption(id)
  }

  return (
    <li className={styles['item']}>
      <label className={styles['item-label']}>{id}</label>
      <input
        type="text"
        className={styles['item-title']}
        value={title}
        onChange={handleTitleChange}
        name="title"
        placeholder="Enter option title"
      />
      <input
        type="number"
        className={styles['item-weight']}
        value={weight ?? ''}
        onChange={handleWeightChange}
        name="weight"
        placeholder="Enter weight"
      />
      <button className={styles['item-btn']} onClick={handleDelete}>DELETE</button>
    </li>
  );
}

export default OptionItem;