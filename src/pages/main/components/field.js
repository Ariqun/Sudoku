import React from 'react';

import {checkCell, checkNotes} from './validate';

const Field = ({matrix, currentCell, setCurrentCell, setNumber}) => {
	const drawNotes = (socket, r, c) => {
		const newSocket = checkNotes(matrix, r, c, socket);

		const content = newSocket.map((cell, i) => {
			return(
				<div className="note" key={`${cell}_${i}`}>
					{cell}
				</div>
			)
		})

		return(
			<div className="notes">
				{content}
			</div>
		)
	}

	const field = matrix.map((row, i) => {
		const cells = row.map((socket, j) => {
			const [row, cell, num] = currentCell;
			const pos = [i, j];
			let content = '';
			let className = '';

			if (socket !== '.') content = socket;
			if (typeof socket === 'object') content = drawNotes(socket, i, j);

			if (row === i || cell === j) className += ' picked';
			if (row === i && cell === j) className += ' current';
			if (num !== '' && num == content && (row !== i || cell !== j)) className += ' same';
			if (!checkCell(matrix, pos, content)) className += ' error';
			if (row === i && cell === j && !checkCell(matrix, pos, content)) className += ' current_error';

			return(
				<td onClick={() => setCurrentCell([i, j, content])} 
					onKeyDown={(e) => setNumber(e.key)} 
					className={className} 
					key={`${i}_${j}`} 
					tabIndex="0"
				>
					{content}
				</td>
			)
		})

		return <tr key={i}>{cells}</tr>;
	})

	return(
		<div className="sudoku">
			<table>
				<tbody>
					{field}
				</tbody>
			</table>
		</div>
	)
}

export default Field;