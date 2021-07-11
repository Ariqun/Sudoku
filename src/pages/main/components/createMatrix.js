import {solveSudoku} from "./validate";

const createField = (difficult) => {
	const matrix = [
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.', '.', '.', '.']
	];

	const solvedSudoku = solveSudoku(matrix);
	const positions = getClearPositions(difficult);
	const field = clearCells(solvedSudoku, positions);

	return field;
}

const countOfEmptyCells = (difficult) => {
	if (difficult === 'easy') return 50;
	if (difficult === 'medium') return 55;
	if (difficult === 'hard') return 60;
	if (difficult === 'expert') return 64;
}

const getRandomNum = (positions) => {
	const num = Math.floor(Math.random() * 81);

	if (positions.includes(num)) return getRandomNum(positions);

	return num;
}

const getClearPositions = (difficult) => {
	const count = countOfEmptyCells(difficult);
	const positions = [];

	for (let i = 1; i <= count; i++) {
		const position = getRandomNum(positions);
		positions.push(position);
	}

	return positions;
}

const clearCells = (solvedSudoku, positions) => {
	for (let pos of positions) {
		const row = Math.floor(pos / 9);
		const cell = pos - (row * 9);

		solvedSudoku[row][cell] = '.';
	}

	return solvedSudoku;
}

export default createField;