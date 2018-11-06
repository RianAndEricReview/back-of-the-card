import React, { Component } from 'react'
/* eslint-disable react/display-name */

export class AnswerRevealPres extends Component {

  componentDidMount() {
    this.props.endAnswerReveal()
  }

  render() {
    const { questions, currentQuestionNum, numOfQuestions, correctAnswerObj } = this.props
    const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
    let correctAnswer = questions.find(question => currentQuestionNum === question.questionNum).correctAnswer
    return (
      <div className="gameplay-container">
        <h1 className="gameplay-logo"> BackOfTheCard </h1>
        <div className="gameboard-question">
          <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
        </div>
        <div>
          {correctAnswerObj.playerCorrect ? <h2>CORRECT!!!</h2> : <h2>INCORRECT</h2>}
        </div>
        <div className="container">
          <div className="row gameboard-answer-container">{currentQuestion.answers.map((answer, index) => {
            return (
              <div key={index} className="form-group">
                <div className="col-6 text-center gameboard-answer-grid">
                  {answer === correctAnswerObj.slicedCorrectAnswer ? <button className="gameboard-answer-buttons btn btn-primary"> {correctAnswer} </button> :
                    <button className="gameboard-answer-buttons btn btn-secondary"> {answer} </button>}
                </div>
              </div>
            )
          }
          )}
          </div>
        </div>
      </div>
    )
  }

}

export default AnswerRevealPres
