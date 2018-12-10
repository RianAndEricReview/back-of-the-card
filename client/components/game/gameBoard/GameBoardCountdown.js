import React, { Component } from 'react'
import { countdown } from '../../../../HelperFunctions/utilityFunctions'

class GameBoardCountdown extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //set the inital seconds on countdownClock for first question
    if (this.props.countdownClock) {
      countdown(this.props.countdownClock, this.props.setCountdownClock)
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.countdownClock}</h1>
      </div>
    )
  }
}

export default GameBoardCountdown
