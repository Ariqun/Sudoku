import React from 'react';
import { observer } from 'mobx-react-lite';

import Button from '../../ui/Button';
import checkIsNumberDone from '../../../utils/checkIsNumDone';
import sudokuStore from '../../../store/sudokuStore';
import classes from './NumberCell.module.scss';

type Props = {
  number: number;
};

const NumberCell: React.FC<Props> = observer((props) => {
  const { number } = props;
  const { matrix } = sudokuStore;

  const isNumDone = checkIsNumberDone(matrix, number);

  const handleClick = () => {
    sudokuStore.setNumber(number.toString());
  };

  return (
    <div className={classes.component}>
      <div className={isNumDone ? 'overlay_key' : 'hidden'} />

      <Button
        className={classes.value}
        onClick={handleClick}
      >
        {isNumDone ? '' : number}
      </Button>
    </div>
  );
});

export default NumberCell;
