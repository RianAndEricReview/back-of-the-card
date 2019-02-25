module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('joinGameRoom', (roomId) => {
      // create/join the room based on game id.
      socket.join(`GameRoom${roomId}`)
      //this is a introductory welcome to the room emission. The info emitted will be updated moving forwards.
      io.in(`GameRoom${roomId}`).emit('welcome', `Welcome to GameRoom ${roomId}`)
    })

    //let eveyone else in the room know how many questions have been created
    socket.on('broadcastNumQuestionsCreated', (gameId, numQuestionsCreated) => {
      socket.to(`GameRoom${gameId}`).emit('setNumQuestionsCreated', numQuestionsCreated)
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

