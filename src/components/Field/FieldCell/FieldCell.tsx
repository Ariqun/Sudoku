import React, { KeyboardEventHandler } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import FieldNotes from '../../FieldNotes';
import sudokuStore from '../../../store/sudokuStore';
import checkCellIsValid from '../../../utils/checkCellIsValid';
import { Cell } from '../../../types';
import classes from './FieldCell.module.scss';

type Props = {
  cell: Cell;
  cellIndex: number;
  rowIndex: number;
};

const FieldCell: React.FC<Props> = observer((props) => {
  const { cell, cellIndex, rowIndex } = props;
  const { currentCell, isDecision, matrix } = sudokuStore;

  const { currentRowIndex, currentCellIndex, cellContent } = currentCell || {};
  const pos = [rowIndex, cellIndex];

  let content: React.ReactNode = '';

  if (cell !== '.') {
    content = cell;
  }

  if (Array.isArray(cell)) {
    content = (
      <FieldNotes
        cell={cell}
        cellIndex={cellIndex}
        matrix={matrix}
        rowIndex={rowIndex}
      />
    );
  }

  const isPicked = currentRowIndex === rowIndex || currentCellIndex === cellIndex;
  const isCurrent = currentRowIndex === rowIndex && currentCellIndex === cellIndex;
  const isSame = cellContent !== '' && cellContent === content && (currentRowIndex !== rowIndex || currentCellIndex !== cellIndex);
  const isError = !checkCellIsValid(matrix, pos, content);
  const isCurrentError = isCurrent && isError;
  const isUserDigit = isDecision && typeof content === 'number';

  if (isError || isCurrentError) {
    sudokuStore.setIsError(true);
  }

  const handleClick = () => {
    sudokuStore.setCurrentCell({
      cellContent: content,
      currentCellIndex: cellIndex,
      currentRowIndex: rowIndex,
    });
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    console.log(event.key);
    sudokuStore.setNumber(event.key);
  };

  return (
    <td
      className={clsx(classes.component, {
        [classes.picked]: isPicked,
        [classes.current]: isCurrent,
        [classes.same]: isSame,
        [classes.error]: isError,
        [classes.current_error]: isCurrentError,
        [classes.user_digit]: isUserDigit,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {content}
    </td>
  );
});

export default FieldCell;
