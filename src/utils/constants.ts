import { Difficult, KeyboardNumbers } from '../types';

export const KEYBOARD_NUMBERS: KeyboardNumbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export const COUNT_OF_EMPTY_CELLS_BY_DIFFICULT: Record<Difficult, number> = {
  easy: 50,
  medium: 55,
  hard: 60,
  expert: 64,
};

/**
 * Клавиши, которые обрабатываются.
 */
export const VALID_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Delete', 'Backspace'];
