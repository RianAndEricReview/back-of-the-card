module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('joinGameRoom', (roomId, newPlayer) => {
      // socket.theCurrentRoomId = roomId
      // console.log('!!!!!!!!!!!!!!!', socket.theCurrentRoomId)
      // io.sockets.roomId = `GameRoom${roomId}`
      // create/join the room based on game id.
      socket.join(`GameRoom${roomId}`)
      //this is a introductory welcome to the room emission. The info emitted will be updated moving forwards.
      io.in(`GameRoom${roomId}`).emit('welcome', `placeholder welcome message for room ${roomId}`)
      // send new player object to players already registered to the game
      socket.to(`GameRoom${roomId}`).emit('newPlayerJoin', newPlayer)
    })
    socket.on('closeGame', (gameId) => {
      console.log('!!!!!!!!!!!!!!!In closeGame', gameId)
      socket.to(`GameRoom${gameId}`).emit('gameClosed')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

