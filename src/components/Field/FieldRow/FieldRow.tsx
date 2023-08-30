import React from 'react';

import FieldCell from '../FieldCell';
import { Row } from '../../../types';
import classes from './FieldRow.module.scss';

type Props = {
  row: Row;
  rowIndex: number;
};

const FieldRow: React.FC<Props> = (props) => {
  const { row, rowIndex } = props;

  return (
    <tr className={classes.component}>
      {row.map((cell, index) => (
        <FieldCell
          cell={cell}
          cellIndex={index}
          rowIndex={rowIndex}
          key={index}
        />
      ))}
    </tr>
  );
};

export default FieldRow;
