import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'app/pages/App'
import Homepage from 'app/pages/Homepage'

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
    </Route>
  )
}
