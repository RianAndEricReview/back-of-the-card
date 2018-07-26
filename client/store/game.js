import axios from 'axios'
import history from '../history'
import socket from '../socket'

//Initial State
const defaultGame = {}

//ACTION TYPES
export const GET_GAME = 'GET_GAME'

//ACTION CREATORS
export const getGame = game => ({ type: GET_GAME, game })

//THUNK CREATORS
export const getGameThunk = (gametypeId, playerId, open) =>
  dispatch => axios.get(`/api/games/${gametypeId}`)
  .then(res => res.data)
  .then(game => {
      if (!game) {
        // Creates a new game with the current player added to that game instance
        axios.post(`/api/games`, { playerId, gametypeId, open })
          .then(newGame => {
            dispatch(getGame(newGame.data))
            history.push(`/game/${newGame.data.id}`)
            //Adds player to socket room for that game.
            socket.joinGameRoomClick(newGame.data.id)
          })
          .catch(err => console.log(err))
      } else {
        // Add the current player to the open game instance
        axios.put(`/api/games/${game.id}/addNewPlayer`, { playerId })
          .then(openGame => {
            dispatch(getGame(openGame.data))
            history.push(`/game/${openGame.data.id}`)
            //Adds player to socket room for that game.
            socket.joinGameRoomClick(openGame.data.id)
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
