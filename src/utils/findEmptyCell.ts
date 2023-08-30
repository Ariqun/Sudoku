import { Matrix } from '../types';

/**
 * Находим пустую ячейку.
 */
const findEmptyCell = (matrix: Matrix) => {
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < matrix.length; cellIndex++) {
      if (matrix[rowIndex][cellIndex] === '.' || Array.isArray(matrix[rowIndex][cellIndex])) {
        return [rowIndex, cellIndex];
      }
    }
  }

  return false;
};

export default findEmptyCell;
