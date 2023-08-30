import { action, makeObservable, observable, reaction } from 'mobx';

import checkIsWin from '../utils/checkIsWin';
import solveSudoku from '../utils/solveSudoku';
import createMatrix, { getEmptyMatrix } from '../utils/matrix';
import { deleteProgressFromLS, getProgressFromLS, setProgressInLS } from '../utils/localStorage';
import { CurrentCell, Difficult, Matrix } from '../types';

class SudokuStore {
  matrix: Matrix = getEmptyMatrix();

  difficult: Difficult = 'easy';

  currentCell?: CurrentCell;

  isError = false;

  isDecision = false;

  isNoteMode = false;

  isWin = false;

  constructor() {
    makeObservable(this, {
      currentCell: observable,
      difficult: observable,
      isDecision: observable,
      isError: observable,
      isNoteMode: observable,
      isWin: observable,
      matrix: observable,
      setCurrentCell: action.bound,
      setDifficult: action.bound,
      setIsError: action.bound,
      setIsWin: action.bound,
      setNumber: action.bound,
      setMatrix: action.bound,
      solveSudoku: action.bound,
      startNewGame: action.bound,
      toggleNoteMode: action.bound,
    });

    reaction(() => this.matrix, () => {
      const isWin = checkIsWin(this.matrix);

      if (isWin) {
        deleteProgressFromLS();
        this.setCurrentCell(undefined);
        this.setIsWin(true);
      }

      this.setIsError(false);
    });

    this.loadGame();
  }

  loadGame() {
    const savedMatrix = getProgressFromLS();

    if (savedMatrix) {
      this.setMatrix(savedMatrix);
      this.setCurrentCell(undefined);
    } else {
      this.startNewGame();
    }
  }

  startNewGame() {
    deleteProgressFromLS();
    this.setCurrentCell(undefined);
    this.setMatrix(createMatrix(this.difficult));
  }

  solveSudoku() {
    const filledSudoku = solveSudoku(this.matrix);

    this.setMatrix(filledSudoku);
    this.setCurrentCell(undefined);
  }

  setNumber(key: string) {
    const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Delete', 'Backspace'];

    if (!this.currentCell || !validKeys.includes(key)) {
      return;
    }

    const content = ['.', 'Delete', 'Backspace'].includes(key) ? '.' : +key;
    const noteMap = ['', '', '', '', '', '', '', '', ''];
    const { currentCellIndex, currentRowIndex } = this.currentCell;
    const newMatrix: Matrix = [...this.matrix];
    const currentSocket = newMatrix[currentRowIndex][currentCellIndex];

    if (currentSocket === '.' || typeof currentSocket === 'number' || Array.isArray(currentSocket)) {
      if (this.isNoteMode && content !== '.') {
        let notes = [...noteMap];

        if (Array.isArray(currentSocket)) {
          notes = [...currentSocket];
        }

        if (notes[content - 1] === content.toString()) {
          notes[content - 1] = '';
        } else {
          notes[content - 1] = content.toString();
        }

        newMatrix[currentRowIndex][currentCellIndex] = notes;
      } else {
        newMatrix[currentRowIndex][currentCellIndex] = content;
        this.setCurrentCell({ currentCellIndex, currentRowIndex, cellContent: content });
      }

      this.setMatrix(newMatrix);
      setProgressInLS(newMatrix);
    }
  }

  setCurrentCell(currentCell?: CurrentCell) {
    this.currentCell = currentCell;
  }

  setDifficult(difficult: Difficult) {
    this.difficult = difficult;
  }

  setIsError(flag: boolean) {
    this.isError = flag;
  }

  setIsWin(flag: boolean) {
    this.isWin = flag;
  }

  setMatrix(matrix: Matrix) {
    this.matrix = matrix;
  }

  toggleNoteMode() {
    this.isNoteMode = !this.isNoteMode;
  }
}

export default new SudokuStore();
