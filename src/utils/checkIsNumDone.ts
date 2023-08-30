import { Matrix } from '../types';

const checkIsNumberDone = (matrix: Matrix, number: number) => {
  let count = 0;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < matrix.length; cellIndex++) {
      if (matrix[rowIndex][cellIndex] === number) {
        count++;
      }
    }
  }

  if (count === 9) {
    return true;
  }

  return false;
};

export default checkIsNumberDone;
