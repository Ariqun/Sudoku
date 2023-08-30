import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Field from '../../components/Field';
import Layout from '../../components/Layout';
import Button from '../../components/ui/Button';
import ControlPanel from '../../components/ControlPanel';
import createMatrix from '../../utils/matrix';
import sudokuStore from '../../store/sudokuStore';
import classes from './Decision.module.scss';

const Decision: React.FC = observer(() => {
  const { isWin, isError, setCurrentCell, setMatrix } = sudokuStore;

  const clearField = () => {
    setMatrix(createMatrix('easy', true));
    setCurrentCell(undefined);
  };

  useEffect(() => {
    clearField();
  }, []); // eslint-disable-line

  const handleSolve = () => {
    if (!isError && !isWin) {
      sudokuStore.solveSudoku();
    }
  };
  console.log(isError);
  return (
    <Layout>
      <Field />

      <div className={classes.container}>
        <ControlPanel />

        <div className={classes.actions}>
          <Button onClick={handleSolve} disabled={isError || isWin}>
            Решить судоку
          </Button>

          <Button onClick={clearField}>
            Очистить поле
          </Button>
        </div>
      </div>
    </Layout>
  );
});

export default Decision;
