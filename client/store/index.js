import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import game from './game'
import players from './players'
import questions from './questions'
import allPlayerAnswers from './allPlayerAnswers'
import playerQuestionResults from './playerQuestionResults'
import countdownClock from './countdownClock'

const reducer = combineReducers(
  {
    user,
    game,
    players,
    questions,
    allPlayerAnswers,
    playerQuestionResults,
    countdownClock
  }
)

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './game'
export * from './players'
export * from './questions'
export * from './allPlayerAnswers'
export * from './playerQuestionResults'
export * from './countdownClock'
