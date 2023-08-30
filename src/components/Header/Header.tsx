import React, { ChangeEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Button from '../ui/Button';
import sudokuStore from '../../store/sudokuStore';
import { Difficult } from '../../types';
import classes from './Header.module.scss';

const Header: React.FC = observer(() => {
  const { difficult, startNewGame, setDifficult } = sudokuStore;
  const navigator = useNavigate();

  const changeDifficult: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDifficult(event.target.value as Difficult);
  };

  const handleStartNewGame = () => {
    navigator('./');
    startNewGame();
  };

  return (
    <div className={classes.component}>
      <select value={difficult} onChange={changeDifficult}>
        <option value="easy">Легкий</option>
        <option value="medium">Средний</option>
        <option value="hard">Сложный</option>
        <option value="expert">Экспертный</option>
      </select>

      <Button onClick={handleStartNewGame}>
        Новая игра
      </Button>

      <Link to={'/decision'}>
        <Button>Решить свое судоку</Button>
      </Link>
    </div>
  );
});

export default Header;
