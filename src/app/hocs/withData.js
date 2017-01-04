import React, {Component} from 'react'
import {connect} from 'react-redux'

function withData (actions = []) {
  function mapStateToProps (state) {
    return {
      xxx: 1234
    }
  }
  return (ComposeComponent) => {
    class ComponentWithData extends Component {
      static prefetchData = actions
      render () {
        return <ComposeComponent {...this.props} />
      }
    }
    return connect(mapStateToProps)(ComponentWithData)
  }
}

export default withData
