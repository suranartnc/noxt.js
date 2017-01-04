import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'

import styles from 'styles/pages/Homepage.scss'

import {fetchData1, fetchData2} from 'app/redux/modules/post/postActions'

@withData([fetchData1, fetchData2])
@CSSModules(styles)
class HomePage extends Component {
  render () {
    const { xxx } = this.props
    return (
      <div styleName="container">
        HomePage
        <p>{xxx}</p>
      </div>
    )
  }
}

// HomePage.propTypes = {
//   params: PropTypes.shape({
//     data: PropTypes.object.isRequired
//   })
// }

export default HomePage
