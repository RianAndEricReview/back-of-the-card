import axios from 'axios'
import history from '../history'

//Initial State
const defaultGame = {}

//ACTION TYPES
export const GET_GAME = 'GET_GAME'
export const CREATE_GAME = 'CREATE_GAME'
export const ADD_PLAYER = 'ADD_PLAYER'

//ACTION CREATORS
export const getGame = game => ({ type: GET_GAME, game })
export const createGame = game => ({ type: CREATE_GAME, game })
export const addPlayer = game => ({ type: ADD_PLAYER, game })

//THUNK CREATORS
export const gameThunk = (gametypeId) =>
  dispatch => axios.get(`/api/games/:${gametypeId}`)
    .then(res => dispatch(getGame(res.data)))
    .catch(err => console.log(err))

export const createGameThunk = (player, gametypeId) =>
  dispatch => axios.post(`/api/games`, { players: {player}, gametypeId })
    .then(res => {
      dispatch(createGame(res.data))
      history.push(`/game/${res.data.id}`)
    })
    .catch(err => console.log(err))

export const addPlayerThunk = (playerId, gameId) =>
  dispatch => axios.put(`/api/games/${gameId}/addNewPlayer`, { playerId })
    .then(res => {
      dispatch(addPlayer(res.data))
      history.push(`/game/${res.data.id}`)
    })
    .catch(err => console.log(err))



//REDUCERS
export default function gameReducer(state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    case CREATE_GAME:
      return action.game
    case ADD_PLAYER:
      return action.game
    default:
      return state
  }
}
