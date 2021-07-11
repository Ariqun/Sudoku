import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import BlueBtn from '../btns/blueBtn';

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

				<BlueBtn text="Новая игра" func={startGame} />

				<div className="btn">
					<Link to={'/decision'}>Решить свой судоку</Link>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Header);