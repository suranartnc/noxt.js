import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'shared/reducers'
import { routerMiddleware } from 'react-router-redux'

export default (history, initialState) => {
  const middlewares = [
    routerMiddleware(history),
  ]

  let enhancer = applyMiddleware(...middlewares)

  if (process.env.BROWSER && process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancer = compose(enhancer, window.devToolsExtension())
  }

  const store = createStore(rootReducer(client), initialState, enhancer)

  if (module.hot) {
    module.hot.accept('app/redux/reducer', () => {
      const nextReducer = require('app/redux/reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
