'use strict';

import React from 'react';

import Logo from '../components/Logo';
import Paper from '../components/Paper';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="app">
				<Logo />
				<Paper />
			</div>
		)
	}
}

export default App;
