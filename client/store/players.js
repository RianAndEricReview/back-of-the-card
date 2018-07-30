import axios from 'axios'
import socket from '../socket'

//Initial State
const defaultPlayers = []

//ACTION TYPES
export const GET_PLAYER = 'GET_PLAYER'
export const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS'

//ACTION CREATORS
export const getPlayer = player => ({ type: GET_PLAYER, player })
export const getAllPlayers = players => ({ type: GET_ALL_PLAYERS, players })

//THUNK CREATORS
export const getAllPlayersThunk = (gameId, playerId) =>
  dispatch => axios.get(`/api/games/${gameId}/players`)
    .then(res => res.data)
    .then(players => {
      dispatch(getAllPlayers(players))
      // isolate newly joined player from the list of players in the game
      const newPlayer = players.find(player => player.user.id === playerId)
      // join the game room via sockets and pass your player info to each player in the room
      socket.joinGameRoom(gameId, newPlayer)
    })
    .catch(err => console.log(err))


//REDUCERS
export default function gameReducer(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYER:
      return [...state, action.player]
    case GET_ALL_PLAYERS:
      return action.players
    default:
      return state
  }
}
