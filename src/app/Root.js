import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'

import getRoutes from 'app/routes'
import config from 'config'

const routes = getRoutes()

const Root = () => (
  <Router
    history={browserHistory}
    routes={routes}
    render={applyRouterMiddleware(useScroll())}
  />
)

export default Root
