import React from 'react';

import Actions from './Actions';
import NumbersRow from './NumbersRow';
import { KEYBOARD_NUMBERS } from '../../utils/constants';
import classes from './ControlPanel.module.scss';

const ControlPanel: React.FC = () => (
  <div className={classes.component}>
    <Actions />

    <div className={classes.numbers}>
      {KEYBOARD_NUMBERS.map((row, index) => (
        <NumbersRow row={row} key={index} />
      ))}
    </div>
  </div>
);

export default ControlPanel;
