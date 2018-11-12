import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const { questions, currentQuestionNum, numOfQuestions, allPlayerAnswers, players } = props
  const currentQuestion = questions.find((question) => question.questionNum === currentQuestionNum)
  return (
    <div className="gameplay-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4><strong>Question {currentQuestionNum}/{numOfQuestions}:</strong> {currentQuestion.question}</h4>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Player</th>
              <th scope="col">Answer</th>
              <th scope="col">Score</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {allPlayerAnswers.sort((a, b) => b.score - a.score).map(player => {
              return (
                <tr key={player.playerId}>
                  <td>{players.find(gamePlayer => gamePlayer.id === player.playerId).user.screenName}</td>
                  <td>{player.answer}</td>
                  <td>{player.score}</td>
                  <td>9 sec</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
