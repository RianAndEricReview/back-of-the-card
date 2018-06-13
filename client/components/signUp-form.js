import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signUpThunk, getUser } from '../store'

const SignUp = props => {
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
          <label htmlFor="passwordConf"><small>Password Confirmation</small></label>
          <input name="passwordConf" type="password" />
        </div>
        <div>
          <label htmlFor="firstName"><small>First Name</small></label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName"><small>Last Name</small></label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="screenName"><small>Screen Name</small></label>
          <input name="screenName" type="color" />
        </div>
        <div>
          <button type="submit" className="btn btn-success">SIGN UP</button>
        </div>
        {
          error && error.response && <div>{error.response.data}</div>
        }
      </form>

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
      //matching the format of the errors coming from the db, as a response object, to render with the error conditionals
      const passwordError = {response: {data: 'Passwords do not match'}}
      const email = event.target.email.value
      const password = event.target.password.value
      const passwordConf = event.target.passwordConf.value
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      const screenName = event.target.screenName.value
      if (password === passwordConf){
        dispatch(signUpThunk(email, password, firstName, lastName, screenName))
      } else {dispatch(getUser({error: passwordError}))}
    }
  }
}


export default connect(mapSignup, mapDispatch)(SignUp)

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
