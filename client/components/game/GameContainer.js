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
      initialQuestionCountdownInt: 5,
      scoringTimer: {}
    }
    this.answerButtonClick = this.answerButtonClick.bind(this)
    this.answerSubmission = this.answerSubmission.bind(this)
    this.endAnswerReveal = this.endAnswerReveal.bind(this)
    this.endRoundResults = this.endRoundResults.bind(this)
    this.resetAnswerSubmitted = this.resetAnswerSubmitted.bind(this)
  }

  resetAnswerSubmitted() {
    this.setState({ answerSubmitted: false, clickedAnswer: '' })
  }

  answerButtonClick(event) {
    event.preventDefault()
    this.setState({ clickedAnswer: event.target.value })
  }

  answerSubmission(event) {
    event.preventDefault()
    let playerQuestionResult = { chosenAnswer: this.state.clickedAnswer, secondsToAnswer: 5, questionId: this.props.questions.find(question => question.questionNum === this.props.game.currentQuestion).id, userId: this.props.user.id }
    let playerAnswer = {
      answer: this.state.clickedAnswer, score: 0, playerId: this.props.players.find(player => {
        return player.userId === this.props.user.id
      }).id
    }

    //The below section of code is a temporary score generator with minimal functionality.
    //This functionality will be moved to GameplayFunctions and expanded upon to take into account time and gametype.
    let correctAnswer = this.props.questions.find(question => this.props.game.currentQuestion === question.questionNum).correctAnswer
    let slicedCorrectAnswer = correctAnswer.slice(0, correctAnswer.indexOf(' ~'))
    playerAnswer.score = playerAnswer.answer === slicedCorrectAnswer ? 1 * playerQuestionResult.secondsToAnswer : 0

    this.setState({
      correctAnswerObj: {
        slicedCorrectAnswer,
        correctAnswer,
        playerCorrect: playerAnswer.answer === slicedCorrectAnswer
      },
      answerSubmitted: true
    })

    this.state.scoringTimer.stop()

    this.props.createQuestionResult(playerQuestionResult)

    socket.emit('submitAnswer', this.props.game.id, playerAnswer)
  }

  endAnswerReveal() {
    const answerRevealTimer = 1000
    setTimeout(() => {
      // After the timer ends, move on to the round results. If it is the last round, set finalRound to true.
      (this.props.game.currentQuestion >= this.props.game.gametype.numOfQuestions) ? this.setState({ displayRoundResults: true, finalRound: true }) : this.setState({ displayRoundResults: true })
    }, answerRevealTimer)
  }

  endRoundResults() {
    const roundResultsTimer = !this.state.finalRound ? 1000 : 1000
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

  componentDidMount() {
    //set the inital seconds on countdownClock for first question
    this.props.setCountdownClock(this.state.initialQuestionCountdownInt)
    //failsafe to make sure no answers are left from a previous game.
    this.props.clearAllPlayerAnswers()
    // the host player will create the questions for the game, all other players will fetch those questions
    this.props.getAllPlayers(this.props.game.id, this.props.user.id)
    if (this.props.game.host) { this.props.createAllQuestions(this.props.game.id, this.props.game.gametype.numOfQuestions) }
    else { this.props.getAllQuestions(this.props.game.id) }
  }

  componentDidUpdate(prevProps) {
    if (this.props.countdownClock === 0 && prevProps.countdownClock !== this.props.countdownClock) {
      this.state.scoringTimer.animate(1)
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
    return ({ questions: this.props.questions, currentQuestionNum: this.props.game.currentQuestion, numOfQuestions: this.props.game.gametype.numOfQuestions, answerButtonClick: this.answerButtonClick, answerSubmission: this.answerSubmission, clickedAnswer: this.state.clickedAnswer, answerSubmitted: this.state.answerSubmitted, generateGameBoardCountdownProps: this.generateGameBoardCountdownProps, countdownClock: this.props.countdownClock, setCountdownClock: this.props.setCountdownClock })
  }

  generateGameOverProps() {
    return ({ players: this.props.players, userId: this.props.user.id })
  }

  render() {
    const gameBoardProps = this.generateGameBoardProps()
    const gameOverProps = this.generateGameOverProps()
    return (
      <div className="game-container space-below-header" onLoad={topOfPageStart()}>
        {(this.props.game.open || this.props.questions.length <= 0) ?
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
                <IndividualPlayerPres player={player} />
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
