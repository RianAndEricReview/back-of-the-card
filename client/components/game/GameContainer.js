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
    return (
      <div className="game-container">
        {(this.props.game.open) ? <LoadingPres /> : <GameBoardPres />}
        <div className="player-sidebar">
          {this.props.game.players.map(player => {
            return (
              <div key={player}>
                <IndividualPlayerPres player={player} />
              </div>)
          })}
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
