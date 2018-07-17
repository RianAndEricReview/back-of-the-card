module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('joinGameRoomClick', (roomId) => {
      socket.join(`GameRoom${roomId}`)
      //this is a introductory welcome to the room emission. The info emitted will be updated moving forwards. 
      io.to(`GameRoom${roomId}`).emit('welcome', `placeholder welcome message for room ${roomId}`)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

