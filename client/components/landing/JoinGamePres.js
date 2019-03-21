import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div>
      <div id="landing-game-container">
        <div id="landing-game-content">
          <div onClick={(e) => props.joinGameClick(e, props.gametypeId, props.playerId, props.gametypes)} style={{ cursor: 'pointer' }}>
            <img src={props.gametypeImage} className="landing-gametype-image" />
            <p className="centered-gametype"> {props.gametypeName} </p>
            <div className="center-container" />
          </div>
        </div>
      </div>
    </div>
  )
}
