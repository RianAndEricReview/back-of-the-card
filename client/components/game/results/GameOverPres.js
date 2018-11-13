import React from 'react'
/* eslint-disable react/display-name */

export default (props) => {
  const { allPlayerAnswers, players, userId } = props
  return (
    <div className="gameplay-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4><strong>GAME OVER!!!</strong></h4>
      </div>
      <div className="container">
        <table className="table table-bordered">
          <caption>Final Standings</caption>
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
                <tr key={player.playerId} className={players.find(gamePlayer => gamePlayer.id === player.playerId).userId === userId ? 'table-active' : 'light'}>
                  <td>{players.find(gamePlayer => gamePlayer.id === player.playerId).user.screenName}</td>
                  <td id={player.score > 0 ? 'playerCorrect' : 'playerIncorrect'}>{player.answer}</td>
                  <td>{player.score}</td>
                  <td>---</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
