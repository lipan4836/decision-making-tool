import type { ReactNode } from "react";
import OptionItem from "../../components/OptionItem/OptionItem";
import styles from './HomePage.module.scss'
import MainBtnsBlock from "../../components/MainBtnsBlock/MainBtnsBlock";
import { useOptionsStore } from "../../store/useOptionsStore";

function HomePage(): ReactNode {
  const {list} = useOptionsStore()
  return (
    <>
      <main className="main">
        <h1>Decision Making Tool</h1>
        <ul className={styles['items-wrap']}>
          {list.map((option) => (
            <OptionItem
              key={option.id}
              id={option.id}
              title={option.title}
              weight={option.weight}
            />
          ))}
        </ul>
        <MainBtnsBlock />
      </main>
    </>
  )
}

export default HomePage;