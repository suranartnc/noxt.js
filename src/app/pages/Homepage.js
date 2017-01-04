import React from 'react'
import CSSModules from 'react-css-modules'

import styles from 'styles/pages/Homepage.scss'

const fetchData1 = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({
    data: 'aaa'
  }), 3000)
})

const fetchData2 = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({
    data: 'bbb'
  }), 5000)
})

@CSSModules(styles)
class Homepage extends React.Component {
  static prefetchData = [
    fetchData1,
    fetchData2
  ]
  render () {
    return (
      <div styleName="container">Homepage</div>
    )
  }
}

export default Homepage
