import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingPres from './LoadingPres'
import IndividualPlayerPres from './IndividualPlayerPres'
import GameBoardPres from './GameBoardPres'
import { getAllPlayersThunk, createAllQuestionsThunk, getAllQuestionsThunk } from '../../store'

export class GameContainerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedAnswer: '',
      playerQuestionResult: {answer: '', time: 0, questionId: null}
    }

    this.answerButtonClick = this.answerButtonClick.bind(this)
    this.answerSubmission = this.answerSubmission.bind(this)
  }

  answerButtonClick(event) {
    event.preventDefault()
    this.setState({clickedAnswer: event.target.value})
  }

  answerSubmission(event) {
    event.preventDefault()
    let playerAnswer = {answer: this.state.clickedAnswer, score: 0, gamePlayer: this.props.user.id}
    let playerQuestionResult = {answer: this.state.clickedAnswer, time: 1, questionId: this.props.game.currentQuestion}
    //The below code is a temporary score generator with minimal functionality. This functionality will be moved to GameplayFunctions and expanded upon to take into account time and gametype.
    let correctAnswer = this.props.questions.find(question => this.props.game.currentQuestion === question.questionNum).correctAnswer
    correctAnswer = correctAnswer.slice(0, correctAnswer.indexOf(' ~'))
    playerQuestionResult.score = playerQuestionResult.answer === correctAnswer ? 1 : 0
    this.setState({playerQuestionResult})
  }

  componentDidMount() {
    // the host player will create the questions for the game, all other players will fetch those questions
    this.props.getAllPlayers(this.props.game.id, this.props.user.id)
    if (this.props.game.host) { this.props.createAllQuestions(this.props.game.id, this.props.game.gametype.numOfQuestions) }
    else { this.props.getAllQuestions(this.props.game.id)}
  }

  render() {
    console.log('STATEEEEEEEE', this.state)
    return (
      <div className="game-container">
        {(this.props.game.open || this.props.questions.length <= 0) ? <LoadingPres /> : <GameBoardPres questions={this.props.questions} currentQuestionNum={this.props.game.currentQuestion} numOfQuestions={this.props.game.gametype.numOfQuestions} answerButtonClick={this.answerButtonClick} answerSubmission={this.answerSubmission} />}
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
  questions: state.questions
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
    }
  }
}

const GameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainerClass))
export default GameContainer
