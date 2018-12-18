import React, { Component } from 'react'

class GameBoardScoringTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // the scoring timer from progressbar.js is created and bound to the game container. This may be adjusted to be put in the store instead.
    this.props.createScoringTimer(this.props.secondsPerRound * 1000)
  }

  render() {
    return (
      <div id="scoringtimer" />
    )
  }
}

export default GameBoardScoringTimer
