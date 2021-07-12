import React, {useState} from 'react';

import Field from '../main/components/field';
import Panel from '../main/components/panel';
import BlueBtn from '../../components/btns/blueBtn';
import createMatrix from '../main/components/createMatrix';
import {checkCell, solveSudoku} from '../main/components/validate';

import '../main/index.sass';

const Decision = () => {
	const [matrix, setMatrix] = useState(createMatrix('empty'));
	const [currentCell, setCurrentCell] = useState([]);
	const [isError, setError] = useState(false);
	const [isSolved, setSolved] = useState(false);

	const setNumber = (key) => {
		const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Delete', 'Backspace'];

		if (currentCell.length === 0 || !validKeys.includes(key)) return;
		
		const content = ['.', 'Delete', 'Backspace'].includes(key) ? '.' : +key;
		const [row, cell] = currentCell;
		let arr = [...matrix];

		arr[row][cell] = content;

		const check = checkCell(matrix, [row, cell], content);

		if (!check) setError(true);
		else setError(false);

		setCurrentCell([row, cell, content]);
		setMatrix(arr);
	}

	const fillSudoku = () => {
		const filledSudoku = solveSudoku(matrix);
		
		setCurrentCell([]);
		setSolved(true);
		setMatrix(filledSudoku);
	}

	const clearField = () => {
		setMatrix(createMatrix('empty'));
		setCurrentCell([]);
		setSolved(false);
	}

	return(
		<div className="decision_page">
			<div className="container-xxl">
				<div className="sudoku_wrapper">
					<div className={isSolved ? "overlay" : "hidden"} />

					<Field matrix={matrix} 
						   currentCell={currentCell} 
						   setCurrentCell={setCurrentCell} 
						   setNumber={setNumber}
					/>
					<Panel setNumber={setNumber} />
				</div>

				<BlueBtn text="Решить судоку" func={isError || isSolved ? () => {} : fillSudoku} />
				<BlueBtn text="Очистить поле" func={clearField} />
			</div>
		</div>
	)
}

export default Decision;