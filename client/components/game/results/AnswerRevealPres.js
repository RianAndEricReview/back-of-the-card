import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const { questions, currentQuestionNum, numOfQuestions, correctAnswerObj } = props
  const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
  let correctAnswer = questions.find(question => currentQuestionNum === question.questionNum).correctAnswer
  return (
    <div className="results-pres-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
      </div>
      <div>
        {correctAnswerObj.playerCorrect ? <h2>CORRECT!!!</h2> : <h2>INCORRECT</h2>}
      </div>
      <div className="container">
        <div className="row center-container gameboard-answer-row">{currentQuestion.answers.map((answer, index) => {
          return (
            <div key={index} className="col-6">
              <div className="text-center gameboard-answer-grid gameboard-answer-col">
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
