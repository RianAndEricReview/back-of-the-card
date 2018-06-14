import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, SignUp, Landing } from './components'
import { meThunk } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {
          isLoggedIn &&
          <Switch>
            <Route path="/" component={Landing} />
          </Switch>
        }

      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(meThunk())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loadInitialData: PropTypes.func.isRequired
}
