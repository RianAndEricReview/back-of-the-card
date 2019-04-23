import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div className="landing-text">
      <p><b>Back of the Card</b> is the online trivia game for the die hard baseball fan. Did you grow up studying the stats on the back of your baseball card collection? Have you memorized who played third base for Pittsburgh in 1960<i><sup>†</sup></i>?
            Can you name which player led the league in HRs in 2008<i><sup>††</sup></i>? Play now to find out how well you know the Back of the Card! </p>
      <div className="landing-text-end">
      <div>
        <p><b>Features Include: </b>
          <br />
          Single and Multi-Player Game Modes, Dynamically Generated Questions... </p>
          </div>
        <button type="button" className="btn btn-outline-primary landing-toggle-text" onClick={(e) => props.toggleTextDisplay(e)}>▼ More</button>
      </div>
    </div>
  )
}
