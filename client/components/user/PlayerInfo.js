import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setPlayerInfoThunk } from '../../store'

const PlayerInfo = props => {
  const { handleSubmit, error, userId, screenName } = props
  const imageArray = []
  for (let i = 0; i <= 2; i++) {
    imageArray.push({ path: `../../../playerImages/playerImage_${i}.jpg`, key: i})
  }
  return (
    <div id="player-info-form">
      <form onSubmit={(event) => handleSubmit(event, userId)}>
        <div>
          <h3>Choose Player Name & Image</h3>
        </div>
        <div className="signup-fields">
          <label htmlFor="screenName"><small>Screen Name</small></label>
          <input name="screenName" type="text" placeholder={screenName} />
        </div>


        <div className="form-group row">
          {
            imageArray.map(image => (
              <div className="form-check" key={image.key}>
                <input className="form-check-input col-md-6" type="radio" name="image" value={image.path} />
                <label className="form-check-label">
                  <img src={image.path} className="img-thumbnail" />
                </label>
              </div>
            ))
          }

        </div>

        <div id="player-info-submit">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    userId: state.user.id,
    error: state.user.error,
    screenName: state.user.screenName
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event, userId) {
      event.preventDefault()
      const screenName = event.target.screenName.value
      dispatch(setPlayerInfoThunk(userId, screenName))
    }
  }
}


export default connect(mapState, mapDispatch)(PlayerInfo)

PlayerInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
