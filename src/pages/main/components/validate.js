// Дефолтные числа преведены к строке для того, чтобы отделять их от пользовательских цифр.
// Дефолтные числа имеют вид 'число', пользовательские - число.

const solveSudoku = (matrix) => {
	const size = 9;

	const solve = () => {
		const currentPosition = findEmpty(matrix);

		if (!currentPosition) return true;

		for (let i = 1; i < size + 1; i++) {
			const currentNum = Math.floor(Math.random() * (10 - 1) + 1);
			const isValid = checkCell(matrix, currentPosition, currentNum);

			if (isValid) {
				const [row, cell] = currentPosition;
				matrix[row][cell] = currentNum.toString();

				if (solve()) return true;

				matrix[row][cell] = '.';
			}
		}

		return false;
	}
	solve();

	return matrix;
}

const checkWin = (matrix) => {
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < matrix.length; c++) {
			const pos = [r, c];

			if (!checkCell(matrix, pos, matrix[r][c])) {
				return false;
			}
		}
	}

	if (findEmpty(matrix)) return false;

	return true;
}

const findEmpty = (matrix) => {
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < matrix.length; c++) {
			if (matrix[r][c] === '.' || typeof matrix[r][c] === 'object') {
				return [r, c];
			}
		}
	}

	return false;
}

const checkCell = (matrix, pos, num) => {
	if (typeof num !== 'number') return true;

	const [row, cell] = pos;
	const boxSize = 3;
	const boxRow = Math.floor(row / boxSize) * boxSize;
	const boxCell = Math.floor(cell / boxSize) * boxSize;

	for (let r = 0; r < matrix.length; r++) {
		if (+matrix[r][cell] === num && r !== row) {
			return false;
		}
	}

	for (let c = 0; c < matrix.length; c++) {
		if (+matrix[row][c] === num && c !== cell) {
			return false;
		}
	}

	for (let r = boxRow; r < boxRow + boxSize; r++) {
		for (let c = boxCell; c < boxCell + boxSize; c++) {
			if (+matrix[r][c] === num && r !== row && c !== cell) {
				return false;
			}
		}
	}

	return true;
}

const checkNotes = (matrix, row, cell, arr) => {
	const boxSize = 3;
	const boxRow = Math.floor(row / boxSize) * boxSize;
	const boxCell = Math.floor(cell / boxSize) * boxSize;

	for (let r = 0; r < matrix.length; r++) {
		if (arr.includes(matrix[r][cell])) {
			const newArr = arr.map(item => {
				if (item == matrix[r][cell]) return '';

				return item;
			})

			return newArr;
		}
	}

	for (let c = 0; c < matrix.length; c++) {
		if (arr.includes(matrix[row][c])) {
			const newArr = arr.map(item => {
				if (item == matrix[row][c]) return '';

				return item;
			})

			return newArr;
		}
	}

	for (let r = boxRow; r < boxRow + boxSize; r++) {
		for (let c = boxCell; c < boxCell + boxSize; c++) {
			if (arr.includes(matrix[r][c])) {
				const newArr = arr.map(item => {
					if (item == matrix[r][c]) return '';
	
					return item;
				})
	
				return newArr;
			}
		}
	}

	return arr;
}

export {checkWin, checkCell, checkNotes, solveSudoku};