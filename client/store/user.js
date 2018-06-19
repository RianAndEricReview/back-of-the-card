import axios from 'axios'
import history from '../history'

//Initial State
const defaultUser = {}

//ACTION TYPES
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const HANDLE_DUPLICATE_ERROR = 'HANDLE_DUPLICATE_ERROR'


//ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
export const handleDuplicateError = err => ({type: HANDLE_DUPLICATE_ERROR, err})


//THUNK CREATORS
export const meThunk = () =>
  dispatch => axios.get(`/auth/me`)
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const signUpThunk = (email, password, firstName, lastName) =>
  dispatch => axios.post(`/auth/signup`, { email, password, firstName, lastName })
    .then(res => {
      dispatch(getUser(res.data))
      history.push(`/player-info/${res.data.id}`)
    }, authError => {
      dispatch(handleDuplicateError({ error: authError }))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const setPlayerInfoThunk = (userId, screenName) =>
  dispatch => axios.put(`/api/users/${userId}`, { screenName })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/')
    }, authError => {
      dispatch(handleDuplicateError({ error: authError }))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const authThunk = (email, password) =>
  dispatch => axios.post(`/auth/login`, { email, password })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/')
    }, authError => {
      dispatch(getUser({ error: authError }))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logOutThunk = () =>
  dispatch => axios.post(`/auth/logout`)
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

//REDUCERS
export default function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case HANDLE_DUPLICATE_ERROR:
      return {...state, ...action.err}
    default:
      return state
  }
}

