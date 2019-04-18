import React from 'react'
import LandingTextLessPres from './LandingTextLessPres';
import LandingTextMorePres from './LandingTextMorePres';
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div className="landing-pres-container">
      <img id="baseball-card-collage" src="../../../images/card-collage-banner.jpg" />
      <h1>BACK OF THE CARD</h1>
      <div id="landing-content">
        {props.showMoreText ? <LandingTextMorePres toggleTextDisplay={props.toggleTextDisplay} /> : <LandingTextLessPres toggleTextDisplay={props.toggleTextDisplay} />}
      </div>
    </div>
  )
}
