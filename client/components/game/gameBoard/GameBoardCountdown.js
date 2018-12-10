import React, { Component } from 'react'

class GameBoardCountdown extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.countdownClock){
      this.props.displayCountdown(this.props.countdownClock, this.props.setCountdownClock)
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
