/** This files exports our invocation to combineReducers passing it all of our reducers
The initial state of our store with data when empty looks like
{
    tweets: {},
    users: {},
    authedUser: {}
} 
**/

import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import tweets from './tweets'

//We combine all reducers into a main root reducer because the createStore function only accepts a single reducer
export default combineReducers({
  authedUser,
  users,
  tweets
}) 

