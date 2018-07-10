import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingPres from './LoadingPres'
import IndividualPlayerPres from './IndividualPlayerPres'
import GameBoardPres from './GameBoardPres'
import { getGameThunk } from '../../store'

export class GameContainerClass extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log('USER', this.props.user, 'PROPS', this.props)
    return (
      <div>
        <LoadingPres />
        <div>
          <IndividualPlayerPres />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  game: state.game,
})

const mapDispatchToProps = dispatch => {

}

const GameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainerClass))
export default GameContainer
