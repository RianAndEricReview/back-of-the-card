import React from 'react'
import { NavLink } from 'react-router-dom'
/* eslint-disable react/display-name */

export default (props) => {
  const { players, userId } = props
  return (
    <div className="gameplay-container">
      <h1 className="gameplay-logo"> BackOfTheCard </h1>
      <div className="gameboard-question">
        <h4 style={{ color: 'red' }}><strong>GAME OVER!!!</strong></h4>
      </div>
      <div className="container">
        <table className="table table-bordered">
          <caption>Final Standings</caption>
          <thead>
            <tr>
              <th scope="col">Place</th>
              <th scope="col">Player</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {players.sort((a, b) => b.gameScore - a.gameScore).map((player, index) => {
              return (
                <tr key={player.userId} className={player.userId === userId ? 'table-active' : 'light'}>
                  <td>{index + 1}</td>
                  <td>{player.user.screenName}</td>
                  <td>{player.gameScore}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <NavLink to="/"><button className="btn btn-dark">Main Menu</button></NavLink>
    </div>
  )
}
