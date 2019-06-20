import axios from 'axios'
import history from '../history'
import socket from '../socket'

//Initial State
const defaultGame = {}

//ACTION TYPES
export const GET_GAME = 'GET_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const CLEAR_GAME_DATA = 'CLEAR_GAME_DATA'
export const INCREMENT_GAME_DATA = 'INCREMENT_GAME_DATA'

//ACTION CREATORS
export const getGame = game => ({ type: GET_GAME, game })
export const updateGame = updatedItem => ({ type: UPDATE_GAME, updatedItem })
export const clearGameData = () => ({ type: CLEAR_GAME_DATA })
export const incrementGameData = itemToIncrement => ({ type: INCREMENT_GAME_DATA, itemToIncrement })

//THUNK CREATORS
export const getGameThunk = (gametypeId, playerId, open) =>
  dispatch => axios.get(`/api/games/${gametypeId}`)
    .then(game => game.data)
    .then(game => {
      if (!game) {
        // Creates a new game with the current player associated with the game instance
        axios.post(`/api/games`, { gametypeId, open, socketId: socket.id })
          .then(newGame => newGame.data)
          .then(newGame => {
            socket.emit('joinGameRoom', newGame.id)
            // Associate the current player to the open game instance
            axios.put(`/api/games/${newGame.id}/addNewPlayer`, { playerId })
              .then(joinedGame => joinedGame.data)
              .then(joinedGame => {
                dispatch(getGame({ ...joinedGame, host: true, numQuestionsCreated: 0 }))
                history.push(`/game/${joinedGame.id}`)
                if (!joinedGame.open) {
                  //let server know that the game is closed, passing game id so that the socket room name can be recreated.
                  socket.emit('closeGame', joinedGame.id)
                  return axios.post(`/api/games/${joinedGame.id}/createQuestions`, { gametypeId: joinedGame.gametypeId })
                }
              })
          })
          .catch(err => console.log(err))
      } else {
        // If a game exists have the player join the socket GameRoom
        socket.emit('joinGameRoom', game.id)
        // Associate the current player to the open game instance
        axios.put(`/api/games/${game.id}/addNewPlayer`, { playerId })
          .then(joinedGame => joinedGame.data)
          .then(joinedGame => {
            dispatch(getGame(joinedGame))
            history.push(`/game/${joinedGame.id}`)
            if (!joinedGame.open) {
              //let server know that the game is closed, passing game id so that the socket room name can be recreated.
              socket.emit('closeGame', joinedGame.id)
              return axios.post(`/api/games/${joinedGame.id}/createQuestions`, { gametypeId: joinedGame.gametypeId })
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
      return { ...state, ...action.updatedItem }
    case INCREMENT_GAME_DATA:
      return { ...state, [action.itemToIncrement.whatToIncrement]: state[action.itemToIncrement.whatToIncrement] + action.itemToIncrement.valueToIncrement }
    case CLEAR_GAME_DATA:
      return {}
    default:
      return state
  }
}
