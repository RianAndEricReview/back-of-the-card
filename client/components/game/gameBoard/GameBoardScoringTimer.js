import React, { Component } from 'react'

class GameBoardScoringTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.createScoringTimer(this.props.secondsPerRound * 1000)
  }

  render() {
    return (
      <div id="scoringtimer" />
    )
  }
}

export default GameBoardScoringTimer
