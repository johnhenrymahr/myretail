import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { default as mapDispatchToProps } from '../state/actions'
import { default as mapStateToProps } from '../state/props'

class App extends Component {

  componentWillMount () {
    console.log('props', this.props)
    this.props.actions.ui.loadData()
  }

  render () {
    return (
      <div className='Item'>
        Hello There Dude
      </div>
    )
  }

}

export const undecorated = App

export default connect(mapStateToProps, mapDispatchToProps)(App)