import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../header';
import Main from '../../pages/main';
import Decision from '../../pages/decision';
import './index.sass';

const App = () => {
	return(
		<div className="App">
			<Header />

			<Route path="/" exact render={() => <Main />} />
			<Route path="/decision" render={() => <Decision />} />
		</div>
	);
}

export default App;
