import React from 'react';
import { observer } from 'mobx-react-lite';

import FieldRow from './FieldRow';
import sudokuStore from '../../store/sudokuStore';
import classes from './Field.module.scss';

const Field: React.FC = observer(() => {
  const { matrix } = sudokuStore;

  return (
    <div className={classes.component}>
      <table>
        <tbody>
          {matrix.map((row, index) => (
            <FieldRow
              row={row}
              rowIndex={index}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Field;
