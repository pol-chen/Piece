'use strict'

require('../less/main.less')

import React from 'react'
import ReactDOM from 'react-dom'

class AboutPanel extends React.Component {
  render() {
    return (
      <div id="about">
        <div className='logo'>
          <img src="img/logo-peace.png" srcSet="img/logo-peace@2x.png 2x" />
        </div>
        <h1>Piece v1.1.0 - Less equals More</h1>
        <p>A simple temporary-note taking app.</p>
        <p>Now you could list what you gonna do the next day before you go to bed;</p>
        <p>Or you could write down some thoughts temporarily while you are focusing on something else.</p>
        <p>With @-handle and #-handle you could easily highlight time, places, people and themes.</p>
        <p>Hope you like it :-D</p>
        <hr />
        <p>Crafted with ❤ by Polaris &copy; 2016 Polaris Chen</p>
        <p><a href="mailto:hi.pol.chen@gmail.com">Write me a letter:D</a></p>
      </div>
    )
  }
}

ReactDOM.render(<AboutPanel />, document.getElementById('root'))
