import io from 'socket.io-client'
import store, { getPlayer } from './store'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log('Socket connected')
})

//placeholer welcome listener
socket.on('welcome', (message) => {
  console.log('Message', message)
})

// receive new player info when the new player joins
socket.on('newPlayerJoin', (newPlayer) => {
  store.dispatch(getPlayer(newPlayer))
})

//function for joining a game room.
socket.joinGameRoom = (roomId, newPlayer) => {
  socket.emit('joinGameRoom', roomId, newPlayer)
}

export default socket
