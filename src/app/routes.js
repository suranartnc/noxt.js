import React from 'react'
import { Route, IndexRoute } from 'react-router'

import PageLayout from 'app/pages/layouts/PageLayout'
import HomePage from 'app/pages/HomePage'
import AboutPage from 'app/pages/AboutPage'

export default function getRoutes () {
  return (
    <Route component={PageLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
    </Route>
  )
}
