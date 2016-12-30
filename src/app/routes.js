import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'pages/App'
import Homepage from 'pages/Homepage'

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
    </Route>
  )
}
