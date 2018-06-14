import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authThunk } from '../../store'

const Login = props => {
  const { handleSubmit, error } = props
  return (
    <div>
      <div>
        <a href="/auth/google" className="btn btn-danger btn-sm">Sign Up with Google</a>
        <a href="/auth/google" className="btn btn-primary btn-sm">Sign Up with Facebook</a>
      </div>
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
          <button type="submit" className="btn btn-success">Login</button>
        </div>
        {
          error && error.response && <div>{error.response.data}</div>
        }
      </form>
    </div>
  )
}

const mapLogin = state => {
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
      dispatch(authThunk(email, password))
    }
  }
}

export default connect(mapLogin, mapDispatch)(Login)

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
