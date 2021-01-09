import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'



class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        Starter Code
      </div>
    )
  }
}

export default connect()(App) 
/* 
- Using the connect() function upgrades a component to a container. 
- Containers can read state from the store and dispatch actions.
Without Container we will have to pass down the store as props which will be tedious when we have to many components to pass down to
- The first bracket is where we get the store through a callback function. We can be more specific about the slice of the store tree 
we want in that callback too
*/