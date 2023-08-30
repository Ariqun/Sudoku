export type Cell = React.ReactNode | string[];

export type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type Matrix = [Row, Row, Row, Row, Row, Row, Row, Row, Row];

export type CurrentCell = {
  currentCellIndex: number;
  currentRowIndex: number;
  cellContent: Cell;
};
