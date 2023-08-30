import React, { useEffect } from 'react';

import Header from '../Header';
import AppRouter from '../AppRouter';
import sudokuStore from '../../store/sudokuStore';

const App: React.FC = () => {
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      sudokuStore.setNumber(event.key);
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <AppRouter />
    </div>
  );
};

export default App;
