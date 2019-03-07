import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logOutThunk } from '../store'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'

const Navbar = props => {
  const { handleClick, isLoggedIn, screenName, playerImage } = props
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div className="nav-container">
            <div className="loggedin-nav-items">
              <NavLink className="home" to="/"><h4>BackOfTheCard</h4></NavLink>
              <Popup
                trigger={<a id="player-statistics" href="#" disabled="true" ><h4>Stats</h4></a>}
                position="bottom center"
                on="hover"
              >
                Feature Coming Soon
              </Popup>

            </div>
            <div className="loggedin-nav-items">
              <a id="player-profile" href="#">
                <img id="player-icon" src={playerImage} />
                <h4>{screenName}</h4>
              </a>
              <a id="logout-link" href="/" onClick={handleClick}><h4>Logout</h4></a>
            </div>
          </div>) : (
            <div className="nav-container">
              <NavLink className="home" to="/"><h4>BackOfTheCard</h4></NavLink>
              <div className="loggedout-nav-item">
                <NavLink to="/login"><h4>Login</h4></NavLink>
                <NavLink to="/signup"><h4>Sign Up</h4></NavLink>
              </div>
            </div>
          )}
      </nav>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    screenName: state.user.screenName,
    playerImage: state.user.playerImage
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logOutThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
