import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div className="player-pres-container">
      <div className="player-content-image">
        <img src={props.player.user.playerImage} />
      </div>
      <div className="player-content-container">
        <div className="player-content">
          <h4>Player: {props.player.user.screenName}</h4>
        </div>
        <div className="player-content">
          <h4>Score: 7224</h4>
        </div>
      </div>
    </div>
  )
}
