import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div>
      <div id="landing-game-container">
        <div id="landing-game-content">
          <div>
            <img src={props.gametypeImage} className="landing-gametype-image" />
            <p className="centered"> {props.gametypeName} </p>
            <p> {props.gametypeDescription} </p>
            <div className="play-button-container">
              <button className="btn play-button" onClick={(e) => props.joinGameClick(e, props.gametypeId, props.playerId, props.gametypes)}>PLAY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
