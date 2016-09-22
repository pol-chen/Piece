'user strict'

import React from 'react'

class Logo extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='logo'>
				<img src="./img/logo-peace.png" srcSet="./img/logo-peace@2x.png 2x" />
			</div>
		)
	}
}

export default Logo
