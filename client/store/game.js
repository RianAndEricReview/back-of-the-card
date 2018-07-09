import axios from 'axios'
import history from '../history'

//Initial State
const defaultGame = {}

//ACTION TYPES
export const GET_GAME = 'GET_GAME'

//ACTION CREATORS
export const getGame = game => ({ type: GET_GAME, game })

//THUNK CREATORS
export const gameThunk = (gametypeId) =>
  dispatch => axios.get(`/api/games/:${gametypeId}`)
    .then(res => dispatch(getGame(res.data || defaultGame)))
    .catch(err => console.log(err))

//REDUCERS
export default function gameReducer(state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    default:
      return state
  }
}
