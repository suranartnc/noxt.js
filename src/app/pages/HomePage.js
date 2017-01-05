import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'
import { fetchData1, fetchData2 } from 'modules/post/postActions'

import ErrorPage from 'noxt/app/pages/ErrorPage'

import styles from 'styles/pages/Homepage.scss'

@withData(({ post, error }) => ({ post, error }), [ fetchData1 ])
@CSSModules(styles)
class HomePage extends Component {
  render () {
    const { post, error } = this.props
    if (error !== false) {
      return <ErrorPage status={error.status} message={error.message} />
    }
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
  }),
  error: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
  })
}

export default HomePage
