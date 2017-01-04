import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'app/redux/reducer'
import { routerMiddleware } from 'react-router-redux'
import apiMiddleware from 'app/redux/middlewares/apiMiddleware'

export default (history, initialState) => {
  const middlewares = [
    routerMiddleware(history),
    apiMiddleware
  ]

  let enhancer = applyMiddleware(...middlewares)

  if (process.env.BROWSER && process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancer = compose(enhancer, window.devToolsExtension())
  }

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
