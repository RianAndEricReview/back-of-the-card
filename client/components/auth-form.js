import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authThunk } from '../store'

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {
          error && error.response && <div>{error.response.data}</div>
        }
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'LOGIN',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'SIGN UP',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      const formName = event.target.name
      dispatch(authThunk(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
