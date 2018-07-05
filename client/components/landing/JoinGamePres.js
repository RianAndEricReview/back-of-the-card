import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div>
      <div id="landing-game-container">
        <div id="landing-game-content">
          <div>
            <img src={props.gametypeImage} className="landing-gametype-image" />
            <h3 className="centered"> {props.gametypeName} </h3>
            <p> {props.gametypeDescription} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
