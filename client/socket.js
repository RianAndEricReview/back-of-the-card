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

// receive new player info when they join
socket.on('newPlayerJoin', (newPlayer) => {
  store.dispatch(getPlayer(newPlayer))
})

//function for joining a game room.
socket.joinGameRoomClick = (roomId, newPlayer) => {
  //console.log to be removed after rooms fully complete.
  console.log('roomId', roomId)
  socket.emit('joinGameRoomClick', roomId, newPlayer)
}

export default socket
