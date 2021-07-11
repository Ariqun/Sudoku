import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';

import createMatrix from './components/createMatrix';
import Field from './components/field';
import Panel from './components/panel';
import {checkWin} from './components/validate';
import './index.sass';

const Main = ({location}) => {
	const difficult = location.difficult ? location.difficult : 'easy';

	const [currentCell, setCurrentCell] = useState([]);
	const [matrix, setMatrix] = useState(createMatrix(difficult));
	const [isNoteMode, setNoteMode] = useState(false);
	const [isWin, setWin] = useState(false);

	useEffect(() => {
		setMatrix(createMatrix(difficult));
		setCurrentCell([]);
		setNoteMode(false);
	}, [location])

	const noteMap = ['', '', '', '', '', '', '', '', ''];

	const setNumber = (num) => {
		if (currentCell.length === 0) return;

		const [row, cell] = currentCell;
		let arr = [...matrix];
		let currentSocket = arr[row][cell];

		if (currentSocket === '.' || typeof currentSocket === 'number' || typeof currentSocket === 'object') {
			if (isNoteMode && num !== '.') {
				let notes = [...noteMap];

				if (typeof currentSocket === 'object') {
					notes = [...arr[row][cell]];
				}

				if (notes[num - 1] === num) {
					notes[num - 1] = '';
				} else {
					notes[num - 1] = num;
				}

				arr[row][cell] = notes;
			} else {
				arr[row][cell] = num;
				setCurrentCell([row, cell, num]);
			}
			
			setMatrix(arr);
			// pushProgressInLS(arr, difficult, id);
		}
	}

	const reloadGame = () => {
		setMatrix(matrix);
		// pushProgressInLS(sudoku, difficult, id);
		setNoteMode(false);
	}

	const checkNoteMode = () => {
		if (isNoteMode) setNoteMode(false);
		if (!isNoteMode) setNoteMode(true);
	}

	if (checkWin(matrix) && isWin !== true) {
		// pushProgressInLS(sudokuMap, difficult, id, true);
		console.log('win');
		setWin(true);
	}

	return(
		<div className="main_page">
			<div className="container-xxl">
				<div className="sudoku_wrapper">
					<div className={isWin ? "overlay" : "hidden"} />

					<Field matrix={matrix}  currentCell={currentCell} setCurrentCell={setCurrentCell}/>

					<Panel setNumber={setNumber} 
						reloadGame={reloadGame} 
						checkNoteMode={checkNoteMode} 
						isNoteMode={isNoteMode}
						matrix={matrix}
					/>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Main);