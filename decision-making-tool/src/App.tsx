import type { ReactNode } from 'react';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import DecisionPage from './pages/DecisionPage/DecisionPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App(): ReactNode {
  return (
    <Routes>
      <Route index element={ <HomePage /> } />
      <Route path="decision-page" element={ <DecisionPage /> } />
      <Route path="*" element={ <NotFoundPage /> } />
    </Routes>
  );
}

export default App;
