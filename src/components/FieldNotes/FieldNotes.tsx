import React from 'react';

import checkNotes from '../../utils/checkNotes';
import { Cell, Matrix } from '../../types';
import classes from './FieldNotes.module.scss';

type Props = {
  cell: Cell;
  cellIndex: number;
  matrix: Matrix;
  rowIndex: number;
};

const FieldNotes: React.FC<Props> = (props) => {
  const { cell, cellIndex, matrix, rowIndex } = props;

  if (!Array.isArray(cell)) {
    return null;
  }

  const newSocket = checkNotes(matrix, rowIndex, cellIndex, cell);

  return (
    <div className={classes.component}>
      {newSocket.map((socket, index) => (
        <div className={classes.note} key={`${rowIndex}_${cellIndex}_${index}`}>
          {socket}
        </div>
      ))}
    </div>
  );
};

export default FieldNotes;
