'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

class PrefsPanel extends React.Component {
	constructor(props) {
		super(props)
	}
  render() {
    return (<div><h1>Prefs Panel</h1></div>)
  }
}

ReactDOM.render(<PrefsPanel />, document.getElementById('root'))
