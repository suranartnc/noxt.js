import React from 'react';
import CSSModules from 'react-css-modules'

import styles from 'app/styles/pages/Homepage.scss'

@CSSModules(styles)
class Homepage extends React.Component {
  render() {
    return (
      <div styleName="container">Homepage</div>
    )
  }
}

export default Homepage
