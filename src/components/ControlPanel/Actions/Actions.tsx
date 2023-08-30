import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Button from '../../ui/Button';
import sudokuStore from '../../../store/sudokuStore';
import classes from './Actions.module.scss';

const Actions: React.FC = observer(() => {
  const { isNoteMode, toggleNoteMode, setNumber } = sudokuStore;

  const handleClear = () => {
    setNumber('.');
  };

  return (
    <div className={classes.component}>
      <Button
        className={classes.mode}
        icon="eraser"
        onClick={handleClear}
      />

      <Button
        className={clsx(classes.mode, { [classes.active]: isNoteMode })}
        icon="pen"
        onClick={toggleNoteMode}
      />
    </div>
  );
});

export default Actions;
