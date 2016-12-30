import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './Homepage.scss'

function Homepage() {
  return (
    <div styleName="container">Homepage</div>
  )
}

export default CSSModules(Homepage, styles)
