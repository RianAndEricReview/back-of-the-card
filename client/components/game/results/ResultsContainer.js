import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AnswerRevealPres from './AnswerRevealPres'
import RoundResultsPres from './RoundResultsPres'
import { clearAllPlayerAnswers, updateGame } from '../../../store'

export class ResultsContainerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayRoundResults: false,
    }

  }

  endAnswerReveal() {
    const answerRevealTimer = 5000
    const roundResultsTimer = answerRevealTimer + 5000
    setTimeout(() => {
      this.setState({ displayRoundResults: true })
    }, answerRevealTimer)
    setTimeout(() => {
      this.props.updateGame({roundOver: false})
    }, roundResultsTimer)
  }

  componentDidMount() {
    this.endAnswerReveal()
  }

  generateAnswerRevealProps() {
    return ({ questions: this.props.questions, currentQuestionNum: this.props.game.currentQuestion, numOfQuestions: this.props.game.gametype.numOfQuestions, correctAnswerObj: this.props.correctAnswerObj })
  }

  render() {
    const answerRevealProps = this.generateAnswerRevealProps()
    return (
      <div className="game-container">
        {
          (!this.state.displayRoundResults) ?
            <AnswerRevealPres {...answerRevealProps} /> :
            <RoundResultsPres />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  questions: state.questions
})

const mapDispatchToProps = dispatch => {
  return {
    clearAllPlayerAnswers() {
      dispatch(clearAllPlayerAnswers())
    },
    updateGame(updatedItem) {
      dispatch(updateGame(updatedItem))
    }
  }
}

const ResultsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsContainerClass))
export default ResultsContainer
