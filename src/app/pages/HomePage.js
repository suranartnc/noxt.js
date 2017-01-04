import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'

import styles from 'styles/pages/Homepage.scss'

import {fetchData1, fetchData2} from 'app/redux/modules/post/postActions'

@withData([fetchData1, fetchData2])
@CSSModules(styles)
class HomePage extends Component {
  render () {
    const { post } = this.props
    return (
      <div styleName="container">
        HomePage
        <p>{post.login}</p>
      </div>
    )
  }
}

HomePage.propTypes = {
  post: PropTypes.shape({
    login: PropTypes.string.isRequired
  })
}

export default HomePage
