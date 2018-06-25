import React, {Component} from 'react'
import store from '../../store'
import LandingPres from './LandingPres'

export default class Landing extends Component {
  constructor(props){
    super(props)

    this.state = store.getState()
  }

  render() {
    return (
      <div>
        <LandingPres />
      </div>
    )
  }
}
