import React, { Component } from 'react'

class GameBoardCountdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionCountdown: 5,
    }
  }

  componentDidMount() {
    if (this.props.questionCountdown){
      this.props.displayCountdown(this.props.questionCountdown, 'questionCountdown')
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.questionCountdown}</h1>
      </div>
    )
  }
}

export default GameBoardCountdown
