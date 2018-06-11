import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signUpThunk } from '../store'

const SignUp = props => {
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
          <label htmlFor="firstName"><small>First Name</small></label>
          <input name="firstName" type="firstName" />
        </div>
        <div>
          <label htmlFor="lastName"><small>Last Name</small></label>
          <input name="lastName" type="lastName" />
        </div>
        <div>
          <label htmlFor="screenName"><small>Screen Name</small></label>
          <input name="screenName" type="screenName" />
        </div>
        <div>
          <button type="submit">SIGN UP</button>
        </div>
        {
          error && error.response && <div>{error.response.data}</div>
        }
      </form>
      <a href="/auth/google">SIGN UP with Google</a>
    </div>
  )
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
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      const screenName = event.target.screenName.value
      dispatch(signUpThunk(email, password, firstName, lastName, screenName))
    }
  }
}


export default connect(mapSignup, mapDispatch)(SignUp)

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
