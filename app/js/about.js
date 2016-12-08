'use strict'

require('../less/about.less')

import React from 'react'
import ReactDOM from 'react-dom'

import {addExternalLinks} from '../link.js'

class AboutPanel extends React.Component {
  componentDidMount() {
    addExternalLinks()
  }
  render() {
    return (
      <div id="about">
        <div className='logo'>
          <img src="img/icon.png" height="72" />
        </div>
        <h1><a href="http://piece.bus1996.me" title="View Piece landing page">Piece v2.0.2</a></h1>
        <p>Less = More</p>
        <hr />
        <p>&copy; 2016 <a href="http://bus1996.me" title="Know more about me">Polaris Chen</a></p>
        <p>Crafted with ❤ by Polaris</p>
        <p><a href="mailto:hi.pol.chen@gmail.com" title="Write me an email">Write me a letter :-D</a></p>
      </div>
    )
  }
}

ReactDOM.render(<AboutPanel />, document.getElementById('root'))
