import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LandingPres from './LandingPres'
import LoginToPlayPres from './LoginToPlayPres'
import JoinGamePres from './JoinGamePres'
import { getGameThunk} from '../../store'
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
                <JoinGamePres gametypeName={gametype.name} gametypeImage={gametype.image} gametypeDescription={gametype.description} gametypeId={gametype.id} playerId={this.props.user.id} joinGameClick={this.props.joinGameClick} gametypes={this.state.gametypes} />
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
    joinGameClick(event, gametypeId, playerId, gametypes) {
      event.preventDefault()
      // Find the maxPlayers associated with the current gametype from the overall list of gametypes
      const maxPlayers = gametypes.find(gametype => {
        return gametype.id === gametypeId
      }).maxPlayers
      // For a one player game, set the open field to be false because the game is full. For all other games set to true.
      // This is because we are adding the current player to the game on click.
      const open = maxPlayers !== 1
      dispatch(getGameThunk(gametypeId, playerId, open))
    }
  }
}

const LandingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingContainerClass))
export default LandingContainer
