import io from 'socket.io-client'
import store, { getPlayer, updateGame, addPlayerAnswer } from './store'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log('Socket connected')
})

// JOIN GAME SOCKETS
//placeholer welcome listener
socket.on('welcome', (message) => {
  console.log('Message', message)
})

// receive new player info when the new player joins
socket.on('newPlayerJoin', (newPlayer) => {
  store.dispatch(getPlayer(newPlayer))
})

// receive game close notification
socket.on('gameClosed', () => {
  store.dispatch(updateGame({ open: false }))
})

//function for joining a game room.
socket.joinGameRoom = (roomId, newPlayer) => {
  socket.emit('joinGameRoom', roomId, newPlayer)
}

// GAMEPLAY SOCKETS
// receive answers from submitting players
socket.on('receiveAnswer', (playerAnswer) => {
  store.dispatch(addPlayerAnswer(playerAnswer))
  // check to see if all players have submitted an answer
  if (store.getState().allPlayerAnswers.length === store.getState().players.length) {
    console.log('Round over - let the store increment question number')
  }
})

export default socket
