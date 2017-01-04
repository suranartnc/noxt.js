import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'app/pages/layouts/PageLayout'
import Homepage from 'app/pages/Homepage'
import AboutPage from 'app/pages/AboutPage'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute component={Homepage} />
      <Route path="/about" component={AboutPage} />
    </Route>
  )
}
