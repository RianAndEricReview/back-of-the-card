import React from 'react'
import GameBoardAnswerForm from './GameBoardAnswerForm'
import GameBoardCountdown from './GameBoardCountdown'
/* eslint-disable react/display-name */

export default (props) => {
  const { questions, currentQuestionNum, numOfQuestions, countdownClock, setCountdownClock } = props
  const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
  return (
    <div className="gameplay-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
      </div>
      {/* if there is time on the countdownClock display countdown component, otherwise show answer form */}
      {countdownClock ? <GameBoardCountdown countdownClock={countdownClock} setCountdownClock={setCountdownClock} /> : <GameBoardAnswerForm answerFormProps={props} />}
    </div>
  )
}
