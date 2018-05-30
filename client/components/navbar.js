import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logOutThunk } from '../store'
import { connect } from 'react-redux'

const Navbar = props => {
  const { handleClick, isLoggedIn } = props
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div className="nav-container">
            <div className="loggedin-nav-items">
              <NavLink className="home" to="/"><h4>BackOfTheCard</h4></NavLink>
              <a id="player-statistics" href="#"><h4>Stats</h4></a>
            </div>
            <div className="loggedin-nav-items">
              <a id="player-profile" href="#">
                <img id="player-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hOEbZ3m_xze6kXPTgqbeSFAKDcu_ujcmFzT-2tI3jI0-DXI0" />
                <p id="player-name"><h4>PlayerName</h4></p>
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
    isLoggedIn: !!state.user.id
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
