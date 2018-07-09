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
export const getGameThunk = (gametypeId, playerId, open) =>
  dispatch => axios.get(`/api/games/${gametypeId}`)
  .then(res => res.data)
  .then(game => {
      if (!game) {
        // Creates a new game with the current player added to that game instance.
        axios.post(`/api/games`, { players: [playerId], gametypeId, open })
          .then(newGame => {
            dispatch(createGame(newGame.data))
            history.push(`/game/${newGame.data.id}`)
          })
          .catch(err => console.log(err))
      } else {
        // Add the current player to the open game instance
        axios.put(`/api/games/${game.id}/addNewPlayer`, { playerId })
          .then(openGame => {
            dispatch(addPlayer(openGame.data))
            history.push(`/game/${openGame.data.id}`)
          })
          .catch(err => console.log(err))
      }
    })
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
