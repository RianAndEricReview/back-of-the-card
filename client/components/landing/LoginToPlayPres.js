import React from 'react'
import { NavLink } from 'react-router-dom'
/* eslint-disable react/display-name */

export default () => {
  return (
      <div id="login-signup-container">
        <h2>Please Log In To Play!</h2>
        <div id="login-signup-buttons">
          <NavLink to="/login"><button className="btn landing-login-button">Login</button></NavLink>
          <NavLink to="/signup"><button className="btn landing-signup-button">Sign Up</button></NavLink>
        </div>
      </div>
  )
}
