import React from 'react'
import CSSModules from 'react-css-modules'

import styles from 'styles/pages/Homepage.scss'

@CSSModules(styles)
class Homepage extends React.Component {
  static prefetchData = [
    () => new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          data: 'aaa'
        })
      }, 5000)
    })
  ]
  render () {
    return (
      <div styleName="container">Homepage</div>
    )
  }
}

export default Homepage
