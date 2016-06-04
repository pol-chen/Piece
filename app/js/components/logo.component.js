import React from 'react';

class Logo extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Logo';
	}
	render() {
		return (
			<div className='logo'>
				<img src="../app/img/logo-peace.png" srcSet="../app/img/logo-peace@2x.png 2x" />
			</div>
		)
	}
}

export default Logo;
