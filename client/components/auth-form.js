import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authThunk } from '../store'

const AuthForm = props => {
  const { handleSubmit, error } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">LOGIN</button>
        </div>
        {
          error && error.response && <div>{error.response.data}</div>
        }
      </form>
      <a href="/auth/google">LOG IN with Google</a>
    </div>
  )
}

const mapLogin = state => {
  return {
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
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
      dispatch(authThunk(email, password))
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
