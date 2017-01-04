import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'

import { Provider } from 'react-redux'
import getRoutes from 'noxt/app/routes'
import createStore from 'app/redux/createStore'

const routes = getRoutes()
const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);

const Root = () => (
  <Provider store={store} key="provider">
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
)

export default Root
