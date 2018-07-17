import io from 'socket.io-client'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log('Socket connected')
})

//placeholer welcome listener
socket.on('welcome', (message) => {
  console.log('Message', message)
})

//function for joining a game room.
socket.joinGameRoomClick = (roomId) => {
  //console.log to be removed after rooms fully complete.
  console.log('roomId', roomId)
  socket.emit('joinGameRoomClick', roomId);
}
export default socket
