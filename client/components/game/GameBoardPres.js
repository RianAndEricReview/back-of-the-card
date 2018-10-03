import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const currentQuestion = props.questions.find((question) => question.questionNum === props.currentQuestionNum)
  return (
    <div className="gameboard-pres-container">
    <h1 id="gameplay-logo"> BackOfTheCard </h1>
    <div id="gameboard-question">
      <h4><strong>Question {props.currentQuestionNum}/{props.numOfQuestions}:</strong> {currentQuestion.question}</h4>
    </div>
      <div className="container">
        <div className="row" id="gameboard-answer-container">{currentQuestion.answers.map((answer, index) => {
          const buttonTypes = ["primary", "danger", "success", "warning"]
          return (
            <div key={index} className="col-6 text-center" id="gameboard-answer-grid">
              <div className={`gameboard-answer-buttons btn btn-outline-${buttonTypes[index]}`}> {answer} </div>
            </div>
          )
        }
        )}
        </div>
      </div>
    </div>
  )
}
