import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'app/redux/reducer'
import { routerMiddleware } from 'react-router-redux'

export default (history, initialState) => {
  const middlewares = [
    routerMiddleware(history)
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
