import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'shared/reducers'
import { routerMiddleware } from 'react-router-redux'
import authMiddleware from 'shared/middlewares/authMiddleware'
import uiMiddleware from 'shared/middlewares/uiMiddleware'

export default (client, history, initialState) => {
  const middlewares = [
    authMiddleware,
    uiMiddleware,
    routerMiddleware(history),
    client.middleware()
  ]

  let enhancer = applyMiddleware(...middlewares)

  if (process.env.BROWSER && process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancer = compose(enhancer, window.devToolsExtension())
  }

  const store = createStore(rootReducer(client), initialState, enhancer)

  if (module.hot) {
    module.hot.accept('shared/reducers', () => {
      const nextReducer = require('shared/reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
