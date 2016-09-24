'use strict'

require('../less/prefs.less')

import React from 'react'
import ReactDOM from 'react-dom'

import {Checkbox} from 'react-desktop/macOs'

const {ipcRenderer} = window.require('electron')
const Config = window.require('electron-config')
const config = new Config()

class PrefsPanel extends React.Component {
	constructor(props) {
		super(props)
	}
  handleCheckAlwaysOnTop = event => {
    ipcRenderer.send('toggle-always-on-top', event.target.checked)
  }
  handleCheckAutoLaunch = event => {
    ipcRenderer.send('toggle-auto-launch', event.target.checked)
  }
  render() {
    return (
      <div className="content">
        <Checkbox
          label="Always on top"
          onChange={this.handleCheckAlwaysOnTop}
          defaultValue="alwaysOnTop"
          defaultChecked={config.get('alwaysOnTop')}
        />
        <Checkbox
          label="Start Piece at login"
          onChange={this.handleCheckAutoLaunch}
          defaultValue="autoLaunch"
          defaultChecked={config.get('autoLaunch')}
        />
      </div>
    )
  }
}

ReactDOM.render(<PrefsPanel />, document.getElementById('root'))
