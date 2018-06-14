import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signUpThunk } from '../../store'

const PlayerInfo = props => {
  const { handleSubmit, error } = props
  return (
    <div id="player-info-form">
      <form onSubmit={handleSubmit}>
      <div>
        <h3>Choose Player Name & Image</h3>
      </div>
        <div className="signup-fields">
          <label htmlFor="screenName"><small>Screen Name</small></label>
          <input name="screenName" type="text" />
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      dispatch(signUpThunk(email, password, firstName, lastName))
    }
  }
}


export default connect(mapState, mapDispatch)(PlayerInfo)

PlayerInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
