'use strict';

import React from 'react';

import Logo from '../components/Logo';
import Paper from '../components/Paper';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemValue: ''
		}
	}
	handleChange(e) {
		this.setState({itemValue: e.target.value});
	}
	render() {
		let props = {};
		props.handleChange = this.handleChange.bind(this);
		props.itemValue = this.state.itemValue;
		return (
			<div className="app">
				<Logo />
				<Paper {...props} />
			</div>
		)
	}
}

export default App;
