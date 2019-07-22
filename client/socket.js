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
socket.on('newPlayerToGame', (newPlayer) => {
  store.dispatch(addPlayerThunk(newPlayer))
})

// receive game close notification
socket.on('gameClosed', () => {
  store.dispatch(updateGame({ open: false }))
})

// increment number of questions created
socket.on('questionsAdded', (numQuestions) => {
  store.dispatch(incrementGameData({ valueToIncrement: numQuestions, whatToIncrement: 'numQuestionsCreated' }))
})

// update number of questions created in store, or set initial value
socket.on('setNumQuestionsCreated', (numQuestions) => {
  store.dispatch(updateGame({ numQuestionsCreated: numQuestions }))
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
