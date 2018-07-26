import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import game from './game'
import players from './players'

const reducer = combineReducers(
  {
    user,
    game,
    players,
  }
)

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './game'
export * from './players'
