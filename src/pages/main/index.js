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

	const setNumber = (key) => {
		const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Delete', 'Backspace'];

		if (currentCell.length === 0 || !validKeys.includes(key)) return;

		const content = ['.', 'Delete', 'Backspace'].includes(key) ? '.' : +key;
		const noteMap = ['', '', '', '', '', '', '', '', ''];
		const [row, cell] = currentCell;
		let arr = [...matrix];
		let currentSocket = arr[row][cell];

		if (currentSocket === '.' || typeof currentSocket === 'number' || typeof currentSocket === 'object') {
			if (isNoteMode && content !== '.') {
				let notes = [...noteMap];

				if (typeof currentSocket === 'object') {
					notes = [...arr[row][cell]];
				}

				if (notes[content - 1] === content) {
					notes[content - 1] = '';
				} else {
					notes[content - 1] = content;
				}

				arr[row][cell] = notes;
			} else {
				arr[row][cell] = content;
				setCurrentCell([row, cell, content]);
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