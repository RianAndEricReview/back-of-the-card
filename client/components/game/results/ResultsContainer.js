import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AnswerRevealPres from './AnswerRevealPres'
import RoundResultsPres from './RoundResultsPres'
import { clearAllPlayerAnswers, setCountdownClock } from '../../../store'

export class ResultsContainerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.endAnswerReveal()
    this.props.resetAnswerSubmitted()
    //reset question countdownClock to initial time
    this.props.setCountdownClock(this.props.initialQuestionCountdownInt)
  }

  componentDidUpdate() {
    if (this.props.displayRoundResults) {
      this.props.endRoundResults()
    }
  }

  generateAnswerRevealProps() {
    return ({ questions: this.props.questions, currentQuestionNum: this.props.game.currentQuestion, numOfQuestions: this.props.game.gametype.numOfQuestions, correctAnswerObj: this.props.correctAnswerObj })
  }

  generateRoundResultsProps() {
    return ({ questions: this.props.questions, currentQuestionNum: this.props.game.currentQuestion, numOfQuestions: this.props.game.gametype.numOfQuestions, allPlayerAnswers: this.props.allPlayerAnswers, players: this.props.players, userId: this.props.user.id })
  }

  render() {
    const answerRevealProps = this.generateAnswerRevealProps()
    const roundResultsProps = this.generateRoundResultsProps()
    return (
      <div className="results-container">
        {
          (!this.props.displayRoundResults) ?
            <AnswerRevealPres {...answerRevealProps} /> :
            <RoundResultsPres {...roundResultsProps} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  questions: state.questions,
  allPlayerAnswers: state.allPlayerAnswers,
  players: state.players,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    clearAllPlayerAnswers() {
      dispatch(clearAllPlayerAnswers())
    },
    setCountdownClock(numOfSeconds) {
      dispatch(setCountdownClock(numOfSeconds))
    }
  }
}

const ResultsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsContainerClass))
export default ResultsContainer
