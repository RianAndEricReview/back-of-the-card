import io from 'socket.io-client'
import store, { addPlayerThunk, updateGame, addPlayerAnswer, updatePlayer, incrementGameData } from './store'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log(`Socket connected ${socket.id}`)
})

// JOIN GAME SOCKETS
//placeholer welcome listener
socket.on('welcome', (message) => {
  console.log('Message', message)
})

// receive new player info when the new player joins
socket.on('newPlayerJoin', (newPlayer) => {
  console.log('NP JOIN', newPlayer)
  store.dispatch(addPlayerThunk(newPlayer))
})

// receive game close notification
socket.on('gameClosed', () => {
  store.dispatch(updateGame({ open: false }))
})

// //function for joining a game room.
// socket.joinGameRoom = (roomId, newPlayer) => {
//   socket.emit('joinGameRoom', roomId, newPlayer)
// }

//
socket.on('newPlayerToRoom', (roomId, newPlayer) => {
  socket.emit('addNewPlayer', roomId, newPlayer)
})

//
socket.on('onlyJoinRoom', (roomId) => {
  socket.emit('joinGameRoomOnly', roomId)
})

// update number of questions created
socket.on('questionsAdded', (numQuestions) => {
  console.log('in the socket: ', numQuestions)
  store.dispatch(incrementGameData({ valueToIncrement: numQuestions, whatToIncrement: 'numQuestionsCreated' }))
})

// GAMEPLAY SOCKETS
// receive answers from submitting players
socket.on('receiveAnswer', (playerAnswer) => {
  store.dispatch(addPlayerAnswer(playerAnswer))
  const currentStore = store.getState()

  // check to see if all players have submitted an answer
  if (currentStore.allPlayerAnswers.length === currentStore.players.length) {
    //if all players have submitted: end the round, update score for each player in store
    store.dispatch(updateGame({ roundOver: true }))
    currentStore.allPlayerAnswers.forEach((playerAnswerObj) => {
      const currentScore = currentStore.players.find(player => {
        return player.id === playerAnswerObj.playerId
      }).gameScore
      store.dispatch(updatePlayer(playerAnswerObj.playerId, { gameScore: playerAnswerObj.score + currentScore }))
    })
  }
})

export default socket
