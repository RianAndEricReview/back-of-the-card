import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div className="landing-pres-container">
      <div id="landing-game-container">
        <div id="landing-game-content">
          <div>
          <img src={props.gametypeImage} />
            <h2 className="centered"> {props.gametypeName} </h2>
            <p> {props.gametypeDescription} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
