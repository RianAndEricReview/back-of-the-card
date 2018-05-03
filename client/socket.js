import io from 'socekt.io-client'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log('Socket connected')
})

export default socket
