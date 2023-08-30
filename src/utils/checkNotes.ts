import checkCellIsValid from './checkCellIsValid';
import { Matrix } from '../types';

/**
 * Проверка заметок.
 * Если в данную ячейку можно засунуть цифру в заметке, то оставляем ее, если нет, то удаляем.
 * Это нужно для того, чтобы в заметки не попадали цифры, которые нельзя поставить в ячейку.
 */
const checkNotes = (matrix: Matrix, rowIndex: number, cellIndex: number, cellsNotes: string[]) => (
  [...cellsNotes].map((cellNote) => (
    checkCellIsValid(matrix, [rowIndex, cellIndex], +cellNote) ? cellNote : ''
  ))
);

export default checkNotes;
