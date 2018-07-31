import axios from 'axios'
import history from '../history'
import socket from '../socket'

//Initial State
const defaultGame = {}

//ACTION TYPES
export const GET_GAME = 'GET_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'

//ACTION CREATORS
export const getGame = game => ({ type: GET_GAME, game })
export const updateGame = gameStatus => ({ type: UPDATE_GAME, gameStatus })

//THUNK CREATORS
export const getGameThunk = (gametypeId, playerId, open) =>
  dispatch => axios.get(`/api/games/${gametypeId}`)
  .then(res => res.data)
  .then(game => {
      if (!game) {
        // Creates a new game with the current player associated with the game instance
        axios.post(`/api/games`, { playerId, gametypeId, open })
          .then(newGame => {
            dispatch(getGame(newGame.data))
            history.push(`/game/${newGame.data.id}`)
          })
          .catch(err => console.log(err))
      } else {
        // Associate the current player to the open game instance
        axios.put(`/api/games/${game.id}/addNewPlayer`, { playerId })
          .then(joinedGame => {
            dispatch(getGame(joinedGame.data))
            history.push(`/game/${joinedGame.data.id}`)
            if (!joinedGame.data.open) {
              //let server know that the game is closed, passing game id so that the socket room name can be recreated.
              socket.emit('closeGame', joinedGame.data.id)
            }
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
    case UPDATE_GAME:
      console.log(action.gameStatus, state)
      return {...state, ...action.gameStatus}
    default:
      return state
  }
}
