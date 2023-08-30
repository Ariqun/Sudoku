import checkCellIsValid from './checkCellIsValid';
import findEmptyCell from './findEmptyCell';
import { Matrix } from '../types';

/**
 * Проверка, правильно ли заполнено поле.
 */
const checkIsWin = (matrix: Matrix) => {
  if (findEmptyCell(matrix)) {
    return false;
  }

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < matrix.length; cellIndex++) {
      const position = [rowIndex, cellIndex];

      if (!checkCellIsValid(matrix, position, matrix[rowIndex][cellIndex])) {
        return false;
      }
    }
  }

  return true;
};

export default checkIsWin;
