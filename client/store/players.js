import axios from 'axios'

//GET_PLAYER action is not currently being used. The idea is to use it when a new socket is added to the room.

//Initial State
const defaultPlayers = []

//ACTION TYPES
export const GET_PLAYER = 'GET_PLAYER'
export const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS'

//ACTION CREATORS
export const getPlayer = player => ({ type: GET_PLAYER, player })
export const getAllPlayers = players => ({ type: GET_ALL_PLAYERS, players })

//THUNK CREATORS
export const getAllPlayersThunk = (gameId) =>
  dispatch => axios.get(`/api/games/${gameId}/players`)
    .then(res => res.data)
    .then(players => {
      dispatch(getAllPlayers(players))
    })
    .catch(err => console.log(err))


//REDUCERS
export default function gameReducer(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYER:
      return [...defaultPlayers, action.player]
    case GET_ALL_PLAYERS:
      return action.players
    default:
      return state
  }
}
