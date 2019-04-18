import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div className="landing-text">
      <p> <b>Back of the Card</b> is the online trivia game for the die hard baseball fan. Did you grow up studying the stats on the back of your baseball card collection? Have you memorized who played third base for Pittsburgh in 1960 (Don Hoak)?
            Can you name which player led the league in HRs in 2008 (Ryan Howard)? If so, then this is the game for you.</p>
      <div className="landing-text-end">
        <p>Features Include: Single and Multi-Player Game Modes, Dynamically Generated Questions... </p>
        <button className="landing-toggle-text" onClick={(e) => props.toggleTextDisplay(e)}>▼ More</button>
      </div>
    </div>
  )
}
