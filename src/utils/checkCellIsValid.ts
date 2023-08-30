import { Cell, Matrix } from '../types';

/**
 * Проверка ячейки.
 */
const checkCellIsValid = (matrix: Matrix, position: number[], cellContent: Cell) => {
  if (typeof cellContent !== 'number') {
    return true;
  }

  const [checkedRowIndex, checkedCellIndex] = position;
  const boxSize = 3;
  const boxRow = Math.floor(checkedRowIndex / boxSize) * boxSize;
  const boxCell = Math.floor(checkedCellIndex / boxSize) * boxSize;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    if (Number(matrix[rowIndex][checkedCellIndex]) === cellContent && rowIndex !== checkedRowIndex) {
      return false;
    }
  }

  for (let cellIndex = 0; cellIndex < matrix.length; cellIndex++) {
    if (Number(matrix[checkedRowIndex][cellIndex]) === cellContent && cellIndex !== checkedCellIndex) {
      return false;
    }
  }

  for (let rowIndex = boxRow; rowIndex < boxRow + boxSize; rowIndex++) {
    for (let cellIndex = boxCell; cellIndex < boxCell + boxSize; cellIndex++) {
      if (Number(matrix[rowIndex][cellIndex]) === cellContent && rowIndex !== checkedRowIndex && cellIndex !== checkedCellIndex) { // eslint-disable-line
        return false;
      }
    }
  }

  return true;
};

export default checkCellIsValid;
