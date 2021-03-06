/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import timerBar from 'progressbar.js'
import LoadingPres from './LoadingPres'
import IndividualPlayerPres from './IndividualPlayerPres'
import GameBoardPres from './gameBoard/GameBoardPres'
import GameOverPres from './results/GameOverPres'
import ResultsContainer from './results/ResultsContainer'
import { getAllPlayersThunk, createAllQuestionsThunk, getAllQuestionsThunk, createQuestionResult, updateGame, updatePlayer, clearAllPlayerAnswers, clearGameData, clearAllPlayers, clearAllQuestions, clearQuestionResults, setCountdownClock } from '../../store'
import { topOfPageStart } from '../../../HelperFunctions/utilityFunctions'
import socket from '../../socket'
import axios from 'axios'

export class GameContainerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedAnswer: '',
      answerSubmitted: false,
      correctAnswerObj: {},
      displayRoundResults: false,
      finalRound: false,
      gameOver: false,
      displayAnswerForm: false,
      initialQuestionCountdownInt: 3,
      scoringTimer: {}
    }
    this.answerButtonClick = this.answerButtonClick.bind(this)
    this.answerSubmission = this.answerSubmission.bind(this)
    this.endAnswerReveal = this.endAnswerReveal.bind(this)
    this.endRoundResults = this.endRoundResults.bind(this)
    this.resetAnswerSubmitted = this.resetAnswerSubmitted.bind(this)
    this.createScoringTimer = this.createScoringTimer.bind(this)
  }

  resetAnswerSubmitted() {
    this.setState({ answerSubmitted: false, clickedAnswer: '' })
  }

  answerButtonClick(event) {
    event.preventDefault()
    this.setState({ clickedAnswer: event.target.value })
  }

  answerSubmission(event) {
    if (event) event.preventDefault()
    let playerQuestionResult = { chosenAnswer: this.state.clickedAnswer, questionId: this.props.questions.find(question => question.questionNum === this.props.game.currentQuestion).id, userId: this.props.user.id }
    let playerAnswer = {
      answer: this.state.clickedAnswer, score: 0, playerId: this.props.players.find(player => {
        return player.userId === this.props.user.id
      }).id
    }

    //The below section of code is a score generator set for a game with timed rounds.
    //This functionality will be made dynamic for timed scoring and will also work for other gametypes in the future.
    this.state.scoringTimer.stop()
    const scoringTimerValue = this.state.scoringTimer.value()
    const timeScoringMultiplier = 1 - scoringTimerValue
    playerQuestionResult.secondsToAnswer = Math.round(scoringTimerValue * this.props.game.gametype.secondsPerRound * 10000) / 10000

    let correctAnswer = this.props.questions.find(question => this.props.game.currentQuestion === question.questionNum).correctAnswer
    let slicedCorrectAnswer = correctAnswer.slice(0, correctAnswer.indexOf(' ~'))
    playerAnswer.correct = playerAnswer.answer === slicedCorrectAnswer
    playerAnswer.score = playerAnswer.correct ? Math.round(1000 * timeScoringMultiplier) : 0

    this.setState({
      correctAnswerObj: {
        slicedCorrectAnswer,
        correctAnswer,
        playerCorrect: playerAnswer.answer === slicedCorrectAnswer
      },
      answerSubmitted: true
    })

    this.props.createQuestionResult(playerQuestionResult)

    socket.emit('submitAnswer', this.props.game.id, playerAnswer)
  }

  endAnswerReveal() {
    const answerRevealTimer = 2500
    setTimeout(() => {
      // After the timer ends, move on to the round results. If it is the last round, set finalRound to true.
      (this.props.game.currentQuestion >= this.props.game.gametype.numOfQuestions) ? this.setState({ displayRoundResults: true, finalRound: true }) : this.setState({ displayRoundResults: true })
    }, answerRevealTimer)
  }

  endRoundResults() {
    const roundResultsTimer = !this.state.finalRound ? 2500 : 1000
    setTimeout(() => {
      // After the timer ends, reset the store/state to be ready to move on to the next question
      // Or if it is the final round, instead set gameOver to true.
      this.setState({ displayRoundResults: false })
      if (!this.state.finalRound) {
        this.props.updateGame({ roundOver: false, currentQuestion: ++this.props.game.currentQuestion })
      } else {
        this.setState({ gameOver: true })
        this.props.players.sort((a, b) => b.gameScore - a.gameScore).forEach((player, index) => {
          this.props.updatePlayer(player.id, { finishPosition: index + 1 })
        })
      }

      this.props.clearAllPlayerAnswers()
    }, roundResultsTimer)
  }

  createScoringTimer(miliseconds) {
    // eslint-disable-next-line no-undef
    // invoked when the GameBoardScoringTimer component mounts to ensure the #scoringtimer div exists for the timerBar to be created.
    this.setState({
      scoringTimer: new timerBar.SemiCircle(scoringtimer, {
        strokeWidth: 4,
        duration: miliseconds,
        color: '#20ec3b',
        trailColor: '#c5c1c2c9',
        trailWidth: 0.5,
        easing: 'easeInOut',
        text: {
          alignToBottom: false,
          style: {
            color: this.state.color,
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            fontSize: '2rem',
          }
        },
        step: (state, bar) => {
          if (bar.value() >= 0.25 && bar.value() < 0.5) {
            bar.path.setAttribute('stroke', '#f0e65c')
            bar.text.style.color = '#f0e65c'
          }
          if (bar.value() >= 0.5 && bar.value() < 0.75) {
            bar.path.setAttribute('stroke', '#fca738')
            bar.text.style.color = '#fca738'
          }
          if (bar.value() >= 0.75) {
            bar.path.setAttribute('stroke', '#fc3838')
            bar.text.style.color = '#fc3838'
          }
          bar.setText(Math.round(1000 * (1 - bar.value())))
        },
        svgStyle: { width: '100%', height: '100%' }
      })
    })
  }

  componentDidMount() {
    //set the inital seconds on countdownClock for first question
    this.props.setCountdownClock(this.state.initialQuestionCountdownInt)
    //failsafe to make sure no answers are left from a previous game.
    this.props.clearAllPlayerAnswers()
    //Get all players already in the game and pass your info to everyone else in game
    this.props.getAllPlayers(this.props.game.id, this.props.user.id)
    // if all the questions have been created, grab them and put them in the store
    if (this.props.game.numQuestionsCreated === this.props.game.gametype.numOfQuestions) this.props.getAllQuestions(this.props.game.id)
  }

  componentDidUpdate(prevProps) {
    //If the countdownClock hits 0, start the scoring timer
    if (this.props.countdownClock === 0 && prevProps.countdownClock !== 0) {
      this.state.scoringTimer.animate(1, {}, () => { this.answerSubmission() })
    }
    // Once the host has created all of the quesions, grab them
    if (this.props.game.numQuestionsCreated === this.props.game.gametype.numOfQuestions && prevProps.game.numQuestionsCreated !== this.props.game.numQuestionsCreated) {
      this.props.getAllQuestions(this.props.game.id)
    }
    //if a new player is added, let sockets know to send out numQuestionsCreated
    if (this.props.players.length > prevProps.players.length) {
      socket.emit('broadcastNumQuestionsCreated', this.props.game.id, this.props.game.numQuestionsCreated)
    }
  }

  componentWillUnmount() {
    //The host updates the game in the DB.
    const userGamePlayer = this.props.players.find((player) => player.userId === this.props.user.id)
    if (this.props.game.host) {
      axios.put(`/api/games/${this.props.game.id}`,
        { currentQuestion: this.props.game.currentQuestion })
        .catch(err => console.log(err))
    }
    //Each player updates their own score and place in the DB.
    axios.put(`/api/gamePlayer/${userGamePlayer.id}`, { gameScore: userGamePlayer.gameScore, finishPosition: userGamePlayer.finishPosition })
      .catch(err => console.log(err))
    //Each player posts all of their question results to the DB.
    axios.post('api/playerQuestionResults', this.props.playerQuestionResults)
      .catch(err => console.log(err))
    //Clears all data for the current game in the store.
    this.props.clearAllGameplay()
  }

  generateGameBoardProps() {
    return ({ questions: this.props.questions, currentQuestionNum: this.props.game.currentQuestion, numOfQuestions: this.props.game.gametype.numOfQuestions, answerButtonClick: this.answerButtonClick, answerSubmission: this.answerSubmission, clickedAnswer: this.state.clickedAnswer, answerSubmitted: this.state.answerSubmitted, generateGameBoardCountdownProps: this.generateGameBoardCountdownProps, countdownClock: this.props.countdownClock, setCountdownClock: this.props.setCountdownClock, createScoringTimer: this.createScoringTimer, secondsPerRound: this.props.game.gametype.secondsPerRound })
  }

  generateGameOverProps() {
    return ({ players: this.props.players, userId: this.props.user.id })
  }

  render() {
    const gameBoardProps = this.generateGameBoardProps()
    const gameOverProps = this.generateGameOverProps()
    return (
      <div className="game-container space-below-header" onLoad={topOfPageStart()}>
        {(this.props.game.open || this.props.questions.length !== this.props.game.gametype.numOfQuestions) ?
          <LoadingPres /> :
          (this.state.gameOver) ?
            <GameOverPres {...gameOverProps} /> :
            (!this.props.game.roundOver) ?
              <GameBoardPres {...gameBoardProps} /> :
              <ResultsContainer correctAnswerObj={this.state.correctAnswerObj} displayRoundResults={this.state.displayRoundResults} endAnswerReveal={this.endAnswerReveal} endRoundResults={this.endRoundResults} resetAnswerSubmitted={this.resetAnswerSubmitted} initialQuestionCountdownInt={this.state.initialQuestionCountdownInt} />
        }
        <div className="player-sidebar">
          {this.props.players.map(player => {
            return (
              <div key={player.id}>
                <IndividualPlayerPres player={player} user={this.props.user} maxPlayers={this.props.game.gametype.maxPlayers} />
              </div>)
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  game: state.game,
  players: state.players,
  questions: state.questions,
  playerQuestionResults: state.playerQuestionResults,
  countdownClock: state.countdownClock,
})

const mapDispatchToProps = dispatch => {
  return {
    getAllPlayers(gameId, playerId) {
      dispatch(getAllPlayersThunk(gameId, playerId))
    },
    createAllQuestions(gameId, numOfQuestions) {
      dispatch(createAllQuestionsThunk(gameId, numOfQuestions))
    },
    getAllQuestions(gameId) {
      dispatch(getAllQuestionsThunk(gameId))
    },
    createQuestionResult(playerQuestionResult) {
      dispatch(createQuestionResult(playerQuestionResult))
    },
    clearAllPlayerAnswers() {
      dispatch(clearAllPlayerAnswers())
    },
    clearAllGameplay() {
      dispatch(clearAllPlayers())
      dispatch(clearAllQuestions())
      dispatch(clearQuestionResults())
      dispatch(clearGameData())
      dispatch(clearAllPlayerAnswers())
    },
    updateGame(updatedItem) {
      dispatch(updateGame(updatedItem))
    },
    updatePlayer(playerId, updatedItem) {
      dispatch(updatePlayer(playerId, updatedItem))
    },
    setCountdownClock(numOfSeconds) {
      dispatch(setCountdownClock(numOfSeconds))
    }
  }
}

const GameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainerClass))
export default GameContainer
