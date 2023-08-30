import { Difficult, Matrix as Matrix } from '../types';
import { COUNT_OF_EMPTY_CELLS_BY_DIFFICULT } from './constants';
import solveSudoku from './solveSudoku';

/**
 * Получаем пустую матрицу.
 */
export const getEmptyMatrix = (): Matrix => ([
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
]);

/**
 * Генерируем номер ячейки, который будет пустой.
 */
const getRandomNumber = (positions: number[]): number => {
  const number = Math.floor(Math.random() * 81);

  if (positions.includes(number)) {
    return getRandomNumber(positions);
  }

  return number;
};

/**
 * Получаем пустые номера ячеек.
 */
const getEmptyPositions = (difficult: Difficult) => {
  const emptyCellsCount = COUNT_OF_EMPTY_CELLS_BY_DIFFICULT[difficult];
  const positions = [];

  for (let i = 1; i <= emptyCellsCount; i++) {
    const randomPosition = getRandomNumber(positions);
    positions.push(randomPosition);
  }

  return positions;
};

/**
 * Берем заполненный судоку и очищаем часть ячеек.
 */
const clearCells = (filledMatrix: Matrix, positions: number[]): Matrix => {
  positions.forEach((position) => {
    const rowIndex = Math.floor(position / 9);
    const cellIndex = position - (rowIndex * 9);

    filledMatrix[rowIndex][cellIndex] = '.';
  });

  return filledMatrix;
};

/**
 * Создаем матрицу для игры.
 */
const createMatrix = (difficult: Difficult, isEmpty?: boolean): Matrix => {
  const matrix = getEmptyMatrix();

  if (isEmpty) {
    return matrix;
  }

  const filledMatrix = solveSudoku(matrix);
  const positions = getEmptyPositions(difficult);
  const field = clearCells(filledMatrix, positions);

  return field;
};

export default createMatrix;
