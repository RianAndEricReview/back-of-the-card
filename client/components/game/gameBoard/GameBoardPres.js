import React from 'react'
import GameBoardAnswerForm from './GameBoardAnswerForm'
import GameBoardScoringTimer from './GameBoardScoringTimer'
/* eslint-disable react/display-name */

export default (props) => {
  const { questions, currentQuestionNum, numOfQuestions, countdownClock, setCountdownClock, createScoringTimer, secondsPerRound } = props
  const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
  return (
    <div className="gameplay-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
      </div>
      {/* The timer is currently always showing but will need to be conditionally rendered in the future depending on the gametype */}
      <GameBoardScoringTimer createScoringTimer={createScoringTimer} secondsPerRound={secondsPerRound} countdownClock={countdownClock} setCountdownClock={setCountdownClock} />
      {/* if there is time on the countdownClock display countdown component, otherwise show answer form */}
      {countdownClock ? null : <GameBoardAnswerForm answerFormProps={props} />}
    </div>
  )
}
