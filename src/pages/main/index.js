import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';

import createMatrix from './components/createMatrix';
import Field from './components/field';
import Panel from './components/panel';
import {checkWin} from './components/validate';
import {deleteProgressFromLS, pushProgressInLS} from '../../components/localStorage/progress';

import './index.sass';

const Main = ({location}) => {
	const difficult = location.difficult ? location.difficult : 'easy';

	const [currentCell, setCurrentCell] = useState([]);
	const [matrix, setMatrix] = useState(createMatrix(difficult));
	const [isNoteMode, setNoteMode] = useState(false);
	const [isWin, setWin] = useState(false);

	useEffect(() => {
		const field = JSON.parse(localStorage.getItem(`sudoku_field`));
		
		if (field) {
			setMatrix(field);
		} else {
			setMatrix(createMatrix(difficult));
			setCurrentCell([]);
			setNoteMode(false);
		}
	}, [location]);

	const setNumber = (num) => {
		if (currentCell.length === 0) return;
		if (![1, 2, 3, 4, 5, 6, 7, 8, 9, '.'].includes(num)) return;

		const noteMap = ['', '', '', '', '', '', '', '', ''];
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
			pushProgressInLS(arr);
		}
	}

	const checkNoteMode = () => {
		if (isNoteMode) setNoteMode(false);
		if (!isNoteMode) setNoteMode(true);
	}

	if (checkWin(matrix) && isWin !== true) {
		deleteProgressFromLS();
		setWin(true);
	}

	return(
		<div className="main_page">
			<div className="container-xxl">
				<div className="sudoku_wrapper">
					<div className={isWin ? "overlay" : "hidden"} />

					<Field matrix={matrix}  
						   currentCell={currentCell} 
						   setCurrentCell={setCurrentCell} 
						   setNumber={setNumber}
					/>

					<Panel setNumber={setNumber}
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