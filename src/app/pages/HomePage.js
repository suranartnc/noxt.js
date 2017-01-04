import React from 'react'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'

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

@withData([fetchData1, fetchData2])
@CSSModules(styles)
class HomePage extends React.Component {
  render () {
    return (
      <div styleName="container">HomePage</div>
    )
  }
}

export default HomePage
