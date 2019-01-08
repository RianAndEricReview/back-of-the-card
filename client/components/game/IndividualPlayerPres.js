/* eslint-disable quotes */
import React from 'react'
/* eslint-disable react/display-name */
export default (props) => {
  return (
    <div className={props.player.user.screenName === props.user.screenName ? 'your-individual-player-pres-container' : 'individual-player-pres-container'}>
      <div className="individual-player-name">
        <h4>{props.player.user.screenName}</h4>
      </div>
      <div className="individual-player-container">
        <div className="individual-player-image">
          <img src={props.player.user.playerImage} />
        </div>
        <div className="individual-player-score">
          <h4>Score: {!props.player.gameScore ? 0 : props.player.gameScore}</h4>
        </div>
      </div>
    </div>
  )
}
