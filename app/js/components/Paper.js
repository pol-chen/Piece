'use strict';

import React from 'react';

class Paper extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Paper';
	}
	componentDidMount() {
		let textarea = document.querySelector('textarea');
		let val = textarea.innerHTML;
		textarea.focus();
		textarea.innerHTML = "";
		textarea.innerHTML = val;
	}
	render() {
		return (
			<div className='paper'>
				<pre><span dangerouslySetInnerHTML={{__html: this.props.itemValue.replace(/\n/g, '<br>').replace(/\r/g, '<br>').replace(/\s/g, '&nbsp;')}}></span><br /></pre>
				<textarea value={this.props.itemValue} onChange={this.props.handleChange} onKeyDown={this.props.handleKeyDown}></textarea>
			</div>
		)
	}
}

export default Paper;
