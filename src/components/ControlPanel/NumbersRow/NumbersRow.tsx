import React from 'react';

import NumberCell from '../NumberCell';
import { KeyboardNumbers } from '../../../types';
import classes from './NumbersRows.module.scss';

type Props = {
  row: KeyboardNumbers[0];
};

const NumbersRow: React.FC<Props> = ({ row }) => (
  <div className={classes.component}>
    {row.map((number) => (
      <NumberCell number={number} key={number} />
    ))}
  </div>
);

export default NumbersRow;
