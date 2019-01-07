import React, { Component } from 'react'
import { countdown, countdownTextConverter } from '../../../../HelperFunctions/utilityFunctions'

class GameBoardScoringTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //set the inital seconds on countdownClock for first question
    if (this.props.countdownClock) {
      countdown(this.props.countdownClock, 1000, this.props.setCountdownClock)
    }
    // the scoring timer from progressbar.js is created and bound to the game container. This may be adjusted to be put in the store instead.
    this.props.createScoringTimer(this.props.secondsPerRound * 1000)
  }

  render() {
    let countdownText = countdownTextConverter(this.props.countdownClock, 'Ready...', 'Set...', 'Play Ball!!!')
    return (
      <div className="gameboard-timer">
        <div id="countdown-timer">
          <p>{countdownText || 'Play Ball!!!'}</p>
        </div>
        <div id="scoringtimer" />
      </div>
    )
  }
}

export default GameBoardScoringTimer
