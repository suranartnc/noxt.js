import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'

import styles from 'styles/pages/Homepage.scss'

const fetchData1 = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({
    data1: 'aaa'
  }), 1000)
})

const fetchData2 = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({
    data2: 'bbb'
  }), 2000)
})

@withData([fetchData1, fetchData2])
@CSSModules(styles)
class HomePage extends Component {
  render () {
    const { params: { data } } = this.props
    return (
      <div styleName="container">
        HomePage
        <p>{data.data1}</p>
        <p>{data.data2}</p>
      </div>
    )
  }
}

HomePage.propTypes = {
  params: PropTypes.shape({
    data: PropTypes.object.isRequired
  })
}

export default HomePage
