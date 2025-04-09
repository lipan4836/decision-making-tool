import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from './NotFoundPage.module.scss'

function NotFoundPage(): ReactNode {
  return (
    <main>
      <h1>OOoops</h1>
      <img src="/404.svg" alt="Error, 404" className={ styles['error-img'] } />
      <p>There is no such page. Are you sure that URL is right?</p>
      <Link  to='/'>Go Home</Link>
    </main>
  );
}

export default NotFoundPage;