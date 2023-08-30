import checkCellIsValid from './checkCellIsValid';
import findEmptyCell from './findEmptyCell';
import { Matrix } from '../types';

/**
 * Решение судоку.
 */
const solveSudoku = (matrix: Matrix): Matrix => {
  const newMatrix: Matrix = [...matrix];
  const size = 9;

  const solve = () => {
    const currentPosition = findEmptyCell(newMatrix);

    if (!currentPosition) {
      return true;
    }

    for (let index = 1; index < size + 1; index++) {
      const currentNum = Math.floor(Math.random() * (10 - 1) + 1);
      const isValid = checkCellIsValid(newMatrix, currentPosition, currentNum);

      if (isValid) {
        const [row, cell] = currentPosition;
        newMatrix[row][cell] = currentNum.toString();

        if (solve()) {
          return true;
        }

        newMatrix[row][cell] = '.';
      }
    }

    return false;
  };

  solve();

  return newMatrix;
};

export default solveSudoku;
