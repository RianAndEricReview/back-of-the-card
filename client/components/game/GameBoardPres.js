import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const { questions, currentQuestionNum, numOfQuestions, answerButtonClick, answerSubmission, clickedAnswer, answerSubmitted } = props
  const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
  return (
    <div className="gameplay-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
      </div>
      <div className="container">
        <form>
          <div className="row center-container gameboard-answer-margin">{currentQuestion.answers.map((answer, index) => {
            const buttonTypes = ['primary', 'danger', 'success', 'warning']
            return (
              <div key={index} className="form-group">
                <div className="col-6 text-center gameboard-answer-grid">
                  <button className={`gameboard-answer-buttons btn btn-outline-${buttonTypes[index]} ${clickedAnswer === answer ? 'active' : ''}`} value={answer} disabled={answerSubmitted && clickedAnswer !== answer} onClick={(event) => answerButtonClick(event)}> {answer} </button>
                </div>
              </div>
            )}
          )}
          </div>
          <div className="center-container">
            {answerSubmitted ? <h3 className="answer-waiting-message">Waiting for all players to answer</h3> : null}
          </div>
          <div className="center-container">
            <button type="submit" className="btn btn-secondary" disabled={!clickedAnswer || answerSubmitted} onClick={(event) => answerSubmission(event)}>SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  )
}
