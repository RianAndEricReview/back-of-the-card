import axios from 'axios'

//ACTION TYPES
export const GET_USER = 'GET_USER'

//ACTION CREATORS
export const getUser = user => ({type: GET_USER, user})

//THUNK CREATORS
export const getUserThunk = () => {}

//REDUCERS
export default function ingredientReducer(user = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return user
  }
}

