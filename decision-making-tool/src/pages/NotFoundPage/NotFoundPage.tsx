import { ReactNode } from "react";
import { Link } from "react-router-dom";

function NotFoundPage(): ReactNode {
  return (
    <main>
      <h1>OOoops</h1>
      <p>There is no such page. Are you sure that URL is right?</p>
      <Link  to='/'>Go Home</Link>
    </main>
  );
}

export default NotFoundPage;