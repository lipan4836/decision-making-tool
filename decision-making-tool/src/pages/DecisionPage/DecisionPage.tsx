import type { ReactNode } from "react";
import DecisionBtnsBlock from "../../components/DecisionBtnsBlock/DecisionBtnsBlock";

function DecisionPage(): ReactNode {
  return (
    <>
      <main className="main">
        <h1>Decision Making Tool</h1>
        <DecisionBtnsBlock />
      </main>
    </>
  )
}

export default DecisionPage;