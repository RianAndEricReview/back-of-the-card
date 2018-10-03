import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const currentQuestion = props.questions.find((question) => question.questionNum === props.currentQuestionNum)
  return (
    <div className="gameboard-pres-container">
      <h1> BACK OF THE CARD </h1>
      <h5><strong>Question {props.currentQuestionNum}/{props.numOfQuestions}:</strong> {currentQuestion.question}</h5>
      <div className="container">
        <div className="row">{currentQuestion.answers.map((answer, index) => {
          const buttonTypes = ["primary", "danger", "success", "warning"]
          return (
            <div key={index} className={`col-6 btn btn-outline-${buttonTypes[index]}`}> {answer} </div>
          )
        }
        )}
        </div>
      </div>
    </div>
  )
}
