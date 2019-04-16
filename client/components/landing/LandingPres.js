import React from 'react'
/* eslint-disable react/display-name */
export default () => {
  return (
    <div className="landing-pres-container">
      <img id="baseball-card-collage" src="../../../images/card-collage-banner.jpg" />
      <h1>BACK OF THE CARD</h1>
      <div id="landing-content-container">
        <div id="landing-content">
          <div id="landing-text">
            <p> Back of the Card is a challenging trivia game for the die hard baseball fan. Are you the fan that has memorized who played third base for Pittsburgh in 1960 (Don Hoak)?
            Or who can name which player led the league in HRs in 2008 (Ryan Howard)? If so, then this is the game for you.</p>
            <p>This project was built using Node.js, React, Redux, Sequelize, Express, Sockets, and other technologies.</p>
            <p>Back of the Card features: Single and Multi-player Game Modes, Dynamically Generated Questions, Baseball Stats from 1873-2017, Timed Scoring, Google Signup, Additional Features and Question Types coming soon! </p>
          </div>
        </div>
      </div>
    </div>
  )
}
