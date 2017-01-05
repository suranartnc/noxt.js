import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'
import { fetchData1, fetchData2 } from 'modules/post/postActions'

import styles from 'styles/pages/Homepage.scss'

@withData(({ post }) => ({ post }), [ fetchData1, fetchData2 ])
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
