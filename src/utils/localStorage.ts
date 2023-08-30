import { Matrix } from '../types';

/**
 * Засовываем матрицу в localStorage.
 */
export const setProgressInLS = (field: Matrix) => {
  localStorage.setItem('sudoku', JSON.stringify(field));
};

/**
 * Вытаскиваем матрицу из localStorage.
 */
export const getProgressFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem('sudoku') || '');
  } catch {
    return null;
  }
};

/**
 * Удаляем матрицу из localStorage.
 */
export const deleteProgressFromLS = () => {
  localStorage.removeItem('sudoku');
};
