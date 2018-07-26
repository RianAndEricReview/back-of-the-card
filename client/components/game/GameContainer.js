import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingPres from './LoadingPres'
import IndividualPlayerPres from './IndividualPlayerPres'
import GameBoardPres from './GameBoardPres'
import { getAllPlayersThunk } from '../../store'

export class GameContainerClass extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.getAllPlayers(this.props.game.id)
  }

  render() {
    return (
      <div className="game-container">
        {(this.props.game.open) ? <LoadingPres /> : <GameBoardPres />}
        {/* <div className="player-sidebar">
          {this.props.game.players.map(player => {
            return (
              <div key={player}>
                <IndividualPlayerPres user={this.props.user} />
              </div>)
          })}
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  game: state.game,
})

const mapDispatchToProps = dispatch => {
  return {
    getAllPlayers(gameId) {
      dispatch(getAllPlayersThunk(gameId))
    }
  }
}

const GameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainerClass))
export default GameContainer
