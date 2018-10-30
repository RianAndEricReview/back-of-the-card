import io from 'socket.io-client'
import store, { getPlayer, updateGame, addPlayerAnswer, updatePlayer } from './store'

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
  const currentStore = store.getState()

  // check to see if all players have submitted an answer
  if (currentStore.allPlayerAnswers.length === currentStore.players.length) {
    //if all players have submitted: end the round, increment question num, update score for each player in store
    store.dispatch(updateGame({ roundOver: true, currentQuestion: ++currentStore.game.currentQuestion }))
    currentStore.allPlayerAnswers.forEach((playerAnswerObj) => {
      const currentScore = currentStore.players.find(player => {
        return player.id === playerAnswerObj.playerId
      }).gameScore
      store.dispatch(updatePlayer(playerAnswerObj.playerId, { gameScore: playerAnswerObj.score + currentScore }))
    })
  }
})

export default socket
