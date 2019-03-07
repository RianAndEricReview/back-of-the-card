import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'
import { authThunk } from '../../store'
import { topOfPageStart } from '../../../HelperFunctions/utilityFunctions'

const Login = props => {
  const { handleSubmit, error } = props
  return (
    <div className="auth-form space-below-header" onLoad={topOfPageStart()}>
      <div className="auth-button-container">
        <Popup
          trigger={<a /*href="/auth/google"*/ className="btn btn-danger btn-sm google-button">Login with Google</a>}
          position="bottom center"
          on="hover"
        >
          <p className="coming-soon-tooltip">Feature Coming Soon</p>
        </Popup>

        <Popup
          trigger={<a /*href="/auth/facebook"*/ className="btn btn-primary btn-sm facebook-button">Login with Facebook</a>}
          position="bottom center"
          on="hover"
        >
          <p className="coming-soon-tooltip">Feature Coming Soon</p>
        </Popup>

      </div>

      <form onSubmit={handleSubmit}>
        <div id="login-form">
          <div className="login-fields">
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="email" />
          </div>
          <div className="login-fields">
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit" className="btn btn-success">Login</button>
          </div>
          {
            error && error.response && <div>{error.response.data}</div>
          }
        </div>
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
