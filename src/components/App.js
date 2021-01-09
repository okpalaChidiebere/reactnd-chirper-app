import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'



class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        {this.props.loading === true
          ? null // we will not load anything until the authedUser is authenticated. Therefore a value is there
        : <Dashboard />}
      </div>
    )
  }
}

//authedUser is the slice of the state tree that this component cares about
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App) 
/* 
- Using the connect() function upgrades a component to a container. 
- Containers can read state from the store and dispatch actions.
Without Container we will have to pass down the store as props which will be tedious when we have to many components to pass down to
- The first bracket is where we get the store through a callback function. We can be more specific about the slice of the store tree 
we want in that callback too
*/