import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../header';
import Main from '../../pages/main';
import './index.sass';

const App = () => {
	return(
		<div className="App">
			<Header />

			<Route path="/" render={() => <Main />} />
		</div>
	);
}

export default App;
