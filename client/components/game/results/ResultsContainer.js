import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AnswerRevealPres from './AnswerRevealPres'
import RoundResultsPres from './RoundResultsPres'
import { clearAllPlayerAnswers } from '../../../store'

export class ResultsContainerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayRoundResults: false,
    }

  }

  endAnswerReveal() {
    setTimeout(() => {
      this.setState({ displayRoundResults: true })
    }, 10000)
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
    }
  }
}

const ResultsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsContainerClass))
export default ResultsContainer
