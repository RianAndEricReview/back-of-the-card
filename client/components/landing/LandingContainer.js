import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LandingPres from './LandingPres'
import LoginToPlayPres from './LoginToPlayPres'
import JoinGamePres from './JoinGamePres'
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
    console.log('STATE', this.state)
    return (
      <div>
        <LandingPres />
        {
          !this.props.user.id ? <LoginToPlayPres /> : this.state.gametypes.map(gametype => {
            return (
              <div key={gametype.id}>
                <JoinGamePres gametypeName={gametype.name} gametypeImage={gametype.image} />
              </div>)
          })
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   addRecipeIngredient(recipeId, recipeIngredient) {
//     event.preventDefault()
//     dispatch(postToRecipeIngredients(recipeId, recipeIngredient, ownProps.history))
//   }
// })

const LandingContainer = withRouter(connect(mapStateToProps)(LandingContainerClass))
export default LandingContainer







// import React, {Component} from 'react'
// import store from '../../store'
// import LandingPres from './LandingPres'
// import LoginToPlayPres from './LoginToPlayPres'
// import JoinGamePres from './JoinGamePres'

// export class LandingContainerClass extends Component {
//   render() {
//     return (
//       <div>
//         <LandingPres />
//         {
//           !this.state.user.id ? <LoginToPlayPres /> : <JoinGamePres />
//         }

//       </div>
//     )
//   }
// }



