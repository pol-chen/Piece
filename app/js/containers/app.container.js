import React from 'react';
import Logo from '../components/logo.component';
import Paper from '../components/paper.component';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemValue: ''
		}
	}
	handleChange(e) {
		this.setState({itemValue: e.target.value});
		if (e.keyCode == 13) {
			alert("ssd")
		}
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

export default AppContainer;
