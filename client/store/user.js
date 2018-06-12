import axios from 'axios'
import history from '../history'

//Initial State
const defaultUser = {}

//ACTION TYPES
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'

//ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })


//THUNK CREATORS
export const meThunk = () =>
  dispatch => axios.get(`/auth/me`)
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const signUpThunk = (email, password, firstName, lastName, screenName) =>
  dispatch => axios.post(`/auth/signup`, { email, password, firstName, lastName, screenName})
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/home')
    }, authError => {
      dispatch(getUser({ error: authError }))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const authThunk = (email, password) =>
  dispatch => axios.post(`/auth/login`, { email, password })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/home')
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
    default:
      return state
  }
}

