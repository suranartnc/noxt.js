import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'noxt/app/pages/App'
import Homepage from 'noxt/app/pages/Homepage'

import getCustomRoutes from 'app/routes'

export default function getRoutes () {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
      {getCustomRoutes()}
    </Route>
  )
}
