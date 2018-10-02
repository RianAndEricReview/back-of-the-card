import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const currentQuestion = props.questions.find((question) => question.questionNum === props.currentQuestionNum )
  return (
    <div className="gameboard-pres-container">
      <h1> Round {props.currentQuestionNum} </h1>
      <h3> {currentQuestion.question} </h3>
      {currentQuestion.answers.map((answer, index) => <h5 key={index}> {answer} </h5>
      )}
    </div>
  )
}
