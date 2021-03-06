import React from 'react';

const Panel = ({setNumber, checkNoteMode = null, isNoteMode = null, matrix = []}) => {
	const numbers = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	];

	const checkIsNumDone = (num) => {
		let count = 0;

		for (let r = 0; r < matrix.length; r++) {
			for (let c = 0; c < matrix.length; c++) {
				if (+matrix[r][c] === num) {
					count++;
				}
			}
		}

		if (count === 9) return true;

		return false;
	}

	const content = numbers.map((row, i) => {
		const cell = row.map(num => {
			const isNumDone = checkIsNumDone(num);

			return(
				<div className="numbers_cell" key={num}>
					<div className={isNumDone ? "overlay_key" : "hidden"}/>

					<div onClick={() => setNumber(num.toString())} className="value">
						{isNumDone ? '' : num}
					</div>
				</div>
			)
		})

		return <div className="numbers_row" key={i}>{cell}</div>
	})

	const createNoteIcon = () => {
		if (isNoteMode === null) return null;

		return(
			<div onClick={() => checkNoteMode()} className={isNoteMode ? "rule notes active" : "rule notes"} title="Режим заметок" >
				<img src={`${process.env.PUBLIC_URL}/assets/icons/notes.png`} alt="notes"/>
			</div>
		)
	}

	return(
		<div className="panel">
			<div className="rules">
				<div onClick={() => setNumber('.')} className="rule clear">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/clear.png`} alt="clear" title="Очистить ячейку" />
				</div>
				{createNoteIcon()}
			</div>

			<div className="numbers">
				{content}
			</div>
		</div>
	)
}

export default Panel;