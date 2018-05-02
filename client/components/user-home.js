import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const UserHome = props => {
  const {email} = props
  console.log('home', props)
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    name: 'hi!'
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}

