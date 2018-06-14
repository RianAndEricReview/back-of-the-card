import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const Landing = props => {
  const {email} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Landing)

Landing.propTypes = {
  email: PropTypes.string
}

