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
    })
    .catch(err => console.log(err))

export const addPlayerThunk = (newPlayer) =>
  //Because eager loading doesn't work on sequelize creation, we find the user and attach it to our newPlayer object.
  dispatch => axios.get(`/api/users/${newPlayer.userId}`)
    .then(res => res.data)
    .then(user => {
      const gamePlayer = { ...newPlayer, user }
      dispatch(getPlayer(gamePlayer))
    })
    .catch(err => console.log(err))


//REDUCERS
export default function playersReducer(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYER:
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
