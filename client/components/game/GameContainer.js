import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingPres from './LoadingPres'
import IndividualPlayerPres from './IndividualPlayerPres'
import GameBoardPres from './GameBoardPres'
import { getAllPlayersThunk } from '../../store'
import { createAllQuestionsThunk } from '../../store/question';

export class GameContainerClass extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.getAllPlayers(this.props.game.id, this.props.user.id)
    if (this.state.game.host) { this.props.createAllQuestions(this.props.game.id) }
  }

  render() {
    return (
      <div className="game-container">
        {(this.props.game.open) ? <LoadingPres /> : <GameBoardPres />}
        <div className="player-sidebar">
          {this.props.players.map(player => {
            return (
              <div key={player.id}>
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
  players: state.players,
})

const mapDispatchToProps = dispatch => {
  return {
    getAllPlayers(gameId, playerId) {
      dispatch(getAllPlayersThunk(gameId, playerId))
    },
    createAllQuestions(gameId) {
      dispatch(createAllQuestionsThunk(gameId))
    }
  }
}

const GameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainerClass))
export default GameContainer
