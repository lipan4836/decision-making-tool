import { ReactNode } from "react";
import OptionItem from "../../components/OptionItem/OptionItem";
import styles from './HomePage.module.scss'
import MainBtnsBlock from "../../components/MainBtnsBlock/MainBtnsBlock";

function HomePage(): ReactNode {
  return (
    <>
      <main className="main">
        <h1>Decision Making Tool</h1>
        <ul className={styles['items-wrap']}>
          <OptionItem />
        </ul>
        <MainBtnsBlock />
      </main>
    </>
  )
}

export default HomePage;