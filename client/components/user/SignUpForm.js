import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'
import { signUpThunk, getUser } from '../../store'
import { topOfPageStart } from '../../../HelperFunctions/utilityFunctions'

const SignUp = props => {
  const { handleSubmit, error } = props
  return (
    <div className="auth-form space-below-header" onLoad={topOfPageStart()}>
      <div className="auth-button-container">
        <Popup
          trigger={<a /*href="/auth/google"*/ className="btn btn-danger btn-sm google-button" >Sign Up with Google</a>}
          position="bottom center"
          on="hover"
        >
          <p className="coming-soon-tooltip">Feature Coming Soon</p>
        </Popup>

        <Popup
          trigger={<a /*href="/auth/facebook"*/ className="btn btn-primary btn-sm facebook-button" >Sign Up with Facebook</a>}
          position="bottom center"
          on="hover"
        >
          <p className="coming-soon-tooltip">Feature Coming Soon</p>
        </Popup>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="name-input-container">
          <div className="name-input">
            <label htmlFor="firstName"><small>First Name</small></label>
            <input name="firstName" type="text" />
          </div>
          <div className="name-input">
            <label htmlFor="lastName"><small>Last Name</small></label>
            <input name="lastName" type="text" />
          </div>
        </div>
        <div className="signup-fields">
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="email" />
        </div>
        <div className="signup-fields">
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div className="signup-fields">
          <label htmlFor="passwordConf"><small>Password Confirmation</small></label>
          <input name="passwordConf" type="password" />
        </div>
        <div id="signup-button">
          <button type="submit" className="btn btn-success">Sign Up</button>
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
      const passwordError = { response: { data: 'Passwords do not match' } }
      const email = event.target.email.value
      const password = event.target.password.value
      const passwordConf = event.target.passwordConf.value
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      if (password === passwordConf) {
        dispatch(signUpThunk(email, password, firstName, lastName))
      } else { dispatch(getUser({ error: passwordError })) }
    }
  }
}


export default connect(mapSignup, mapDispatch)(SignUp)

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
