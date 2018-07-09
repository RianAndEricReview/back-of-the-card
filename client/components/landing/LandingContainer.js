import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LandingPres from './LandingPres'
import LoginToPlayPres from './LoginToPlayPres'
import JoinGamePres from './JoinGamePres'
import { getGameThunk, createGameThunk, addPlayerThunk } from '../../store'
import axios from 'axios'

export class LandingContainerClass extends Component {
  constructor(props) {
    super(props)
    this.state = { gametypes: [] }
    this._mounted = false

    this.fetchGametypes = this.fetchGametypes.bind(this)
  }


  fetchGametypes() {
    axios.get(`/api/games/gametypes`)
      .then(res => res.data)
      .then(gametypes => {
        if (this._mounted) this.setState({ gametypes })
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this._mounted = true
    this.fetchGametypes()
  }

  componentWillUnmount() {
    this._mounted = false
  }

  render() {
    return (
      <div>
        <LandingPres />

        {
          !this.props.user.id ? <LoginToPlayPres /> : <div className="container"><div className="row">{this.state.gametypes.map(gametype => {
            return (
              gametype.enabled && <div key={gametype.id} className="col-4 landing-gametype">
                <JoinGamePres gametypeName={gametype.name} gametypeImage={gametype.image} gametypeDescription={gametype.description} gametypeId={gametype.id} userId={this.props.user.id} joinGameClick={this.props.joinGameClick} />
              </div>
            )
          })
          }
          </div>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => {
  return {
    joinGameClick(event, gametypeId, userId) {
      event.preventDefault()
      const playerId = userId
      console.log('gametypeId', gametypeId, 'playerId', playerId, '!!!!!!!')
      dispatch(getGameThunk(gametypeId))
        .then(game => {
          console.log('GAMEEEEEE', game)
          if (!game) {
            dispatch(createGameThunk(playerId, gametypeId))
          } else {
            dispatch(addPlayerThunk(playerId, game.id))
          }
        })
        .catch(err => console.error(err))
    }
  }
}

const LandingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingContainerClass))
export default LandingContainer
