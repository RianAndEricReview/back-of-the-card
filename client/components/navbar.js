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
            <NavLink to="/">Home</NavLink>
            <a href="/" onClick={handleClick}>Logout</a>
          </div>) : (
            <div className="nav-container">
              <NavLink className="loggedout-home" to="/">Home</NavLink>
              <div className="loggedout-nav-item">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
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
