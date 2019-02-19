import axios from 'axios'
import socket from '../socket'

//Initial State
const defaultPlayers = []

//ACTION TYPES
export const GET_PLAYER = 'GET_PLAYER'
export const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS'
export const UPDATE_PLAYER = 'UPDATE_PLAYER'
export const CLEAR_ALL_PLAYERS = 'CLEAR_ALL_PLAYERS'

//ACTION CREATORS
export const getPlayer = player => ({ type: GET_PLAYER, player })
export const getAllPlayers = players => ({ type: GET_ALL_PLAYERS, players })
export const updatePlayer = (playerId, updatedItem) => ({ type: UPDATE_PLAYER, playerId, updatedItem })
export const clearAllPlayers = () => ({ type: CLEAR_ALL_PLAYERS })

//THUNK CREATORS
export const getAllPlayersThunk = (gameId, playerId) =>
  dispatch => axios.get(`/api/games/${gameId}/players`)
    .then(res => res.data)
    .then(players => {
      dispatch(getAllPlayers(players))
      // isolate newly joined player from the list of players in the game
      // const newPlayer = players.find(player => player.user.id === playerId)
      // // join the game room via sockets and pass your player info to each player in the room
      // socket.joinGameRoom(gameId, newPlayer)
    })
    .catch(err => console.log(err))

export const addPlayerThunk = (newPlayer) =>
  dispatch => axios.get(`/api/users/${newPlayer.userId}`)
  .then(res => res.data)
  .then(user => {
    const gamePlayer = {...newPlayer, user}
    dispatch(getPlayer(gamePlayer))
  })
  .catch(err => console.log(err))


//REDUCERS
export default function playersReducer(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYER:
    console.log('get player case', action.player)
      return [...state, action.player]
    case GET_ALL_PLAYERS:
      return action.players
    case UPDATE_PLAYER:
      return state.map(player => { return (player.id === action.playerId) ? { ...player, ...action.updatedItem } : player })
    case CLEAR_ALL_PLAYERS:
      return []
    default:
      return state
  }
}
