import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom' //note we re-named BrowsermRouter to be Router
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet' 
import TweetPage from './TweetPage'
import Nav from './Nav'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        {/*Router component only allows for a single child element. THis is why we 
        wrap our loading bar and our div together */}
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null  // we will not load anything until the authedUser is authenticated. Therefore a value is there
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>}
          </div>
        </Fragment>
      </Router>
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