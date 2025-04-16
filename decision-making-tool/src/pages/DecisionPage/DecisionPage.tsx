import type { ReactNode } from "react";
import DecisionBtnsBlock from "../../components/DecisionBtnsBlock/DecisionBtnsBlock";
import Wheel from "../../components/Wheel/Wheel";

function DecisionPage(): ReactNode {
  return (
    <>
      <main className="main">
        <h1>Decision Making Tool</h1>
        <DecisionBtnsBlock />
        <Wheel />
      </main>
    </>
  )
}

export default DecisionPage;