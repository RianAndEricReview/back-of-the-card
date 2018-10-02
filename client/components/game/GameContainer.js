import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingPres from './LoadingPres'
import IndividualPlayerPres from './IndividualPlayerPres'
import GameBoardPres from './GameBoardPres'
import { getAllPlayersThunk, createAllQuestionsThunk } from '../../store'

export class GameContainerClass extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.getAllPlayers(this.props.game.id, this.props.user.id)
    if (this.props.game.host) { this.props.createAllQuestions(this.props.game.id, this.props.game.gametype.numOfQuestions) }
  }

  render() {
    return (
      <div className="game-container">
        {(this.props.game.open || this.props.questions.length <= 0) ? <LoadingPres /> : <GameBoardPres questions={this.props.questions} currentQuestionNum={this.props.game.currentQuestion} />}
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
  questions: state.questions
})

const mapDispatchToProps = dispatch => {
  return {
    getAllPlayers(gameId, playerId) {
      dispatch(getAllPlayersThunk(gameId, playerId))
    },
    createAllQuestions(gameId, numOfQuestions) {
      dispatch(createAllQuestionsThunk(gameId, numOfQuestions))
    }
  }
}

const GameContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainerClass))
export default GameContainer
