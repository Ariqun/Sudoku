import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import {deleteProgressFromLS} from '../localStorage/progress';
import './index.sass';

const Header = ({history}) => {
	const [difficult, setDifficult] = useState('easy');

	const changeDifficult = (e) => setDifficult(e.target.value);

	const startGame = () => {
		deleteProgressFromLS();

		history.push({
			pathname: '/',
			difficult: difficult
		});
	}

	return(
		<div className="header">
			<div className="container-xxl">
				<select value={difficult} onChange={changeDifficult}>
					<option value="easy">Легкий</option>
					<option value="medium">Средний</option>
					<option value="hard">Сложный</option>
					<option value="expert">Экспертный</option>
				</select>
				<button onClick={() => startGame()}>Новая игра</button>
			</div>
		</div>
	)
}

export default withRouter(Header);