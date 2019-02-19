module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('addNewPlayer', (roomId, newPlayer) => {
      // // create/join the room based on game id.
      // socket.join(`GameRoom${roomId}`)
      // //this is a introductory welcome to the room emission. The info emitted will be updated moving forwards.
      // io.in(`GameRoom${roomId}`).emit('welcome', `placeholder welcome message for room ${roomId}`)
      // send new player object to players already registered to the game
      socket.to(`GameRoom${roomId}`).emit('newPlayerJoin', newPlayer)
    })

    socket.on('joinGameRoomOnly', (roomId) => {
      // create/join the room based on game id.
      socket.join(`GameRoom${roomId}`)
      //this is a introductory welcome to the room emission. The info emitted will be updated moving forwards.
      io.in(`GameRoom${roomId}`).emit('welcome', `only join room ${roomId}`)
    })

    //let everyone in the game room know they need to close the game.
    socket.on('closeGame', (gameId) => {
      socket.to(`GameRoom${gameId}`).emit('gameClosed')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // send submitted answer to all players in the room
    socket.on('submitAnswer', (gameId, playerAnswer) => {
      io.in(`GameRoom${gameId}`).emit('receiveAnswer', playerAnswer)
    })
  })
}

