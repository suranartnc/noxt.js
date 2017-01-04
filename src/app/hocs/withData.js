import React, {Component} from 'react'

function withData (actions = []) {
  return (ComposeComponent) => class extends Component {
    static prefetchData = actions
    render () {
      return <ComposeComponent {...this.props} />
    }
  }
}

export default withData
