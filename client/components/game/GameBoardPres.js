import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const {questions, currentQuestionNum, numOfQuestions, answerButtonClick, answerSubmission} = props
  const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
  return (
    <div className="gameboard-pres-container">
      <h1 id="gameplay-logo"> BackOfTheCard </h1>
      <div id="gameboard-question">
        <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
      </div>
      <div className="container">
        <form>
          <div className="row" id="gameboard-answer-container">{currentQuestion.answers.map((answer, index) => {
            const buttonTypes = ['primary', 'danger', 'success', 'warning']
            return (
              <div key={index} className="form-group">
                <div className="col-6 text-center" id="gameboard-answer-grid">
                  <button className={`gameboard-answer-buttons btn btn-outline-${buttonTypes[index]}`} value={answer} onClick={(event) => answerButtonClick(event)}> {answer} </button>
                </div>
              </div>
            )
          }
          )}
          </div>
          <button type="submit" onClick={(event) => answerSubmission(event)}>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}
