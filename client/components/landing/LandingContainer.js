import React, {Component} from 'react'
import store from '../../store'
import LandingPres from './LandingPres'
import LoginToPlayPres from './LoginToPlayPres'
import JoinGamePres from './JoinGamePres'

export default class Landing extends Component {
  constructor(props){
    super(props)

    this.state = store.getState()
  }

  render() {
    return (
      <div>
        <LandingPres />
        {
          !this.state.user.id ? <LoginToPlayPres /> : <JoinGamePres />
        }

      </div>
    )
  }
}
