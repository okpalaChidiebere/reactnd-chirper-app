import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
  render() {
      //console.log(this.props) to check the props is data(tweets from mapStateToProps methos below) from the store before we start to render our the UI
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <Tweet id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


/*This method returns the slice of tree(tweets) that this component will need from the Store which will be pass as props(tweetIds) to this Container component
Reminder: call the conntect function made this component a container component
This function graps the tweets slice from the store and return an object with tweetIds propert in it
Object.keys(tweets) graps all the tweetId of our tweets. Object.keys() method always return an array. And you can only call the.sort(), .map(), .filter() method on an array. So Object.key() helps you to loop through an object by converting the object to an array.
.sort()then sorts our tweets by their ids(tweets[tweetId].timestamp)

Rememebr our tweets slice in the store looks like this
tweets: {
    tweetId: { tweet id, author’s id, timestamp, text, likes, replies, replyingTo},
    tweetId: { tweet id, author’s id, timestamp, text, likes, replies, replyingTo}
  }

The important things to note are that:
- tweets is the slice of the state that this component cares about
- tweetIds will show up as a property on this container
*/
const mapStateToProps = ({ tweets }) => ( { tweetIds: Object.keys(tweets).sort((a,b) => tweets[b].timestamp - tweets[a].timestamp) } ) 


export default connect(mapStateToProps)(Dashboard) 

/**
 * Remember that the signature of the connect function looks like this:
 * connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 * 
 * https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md
 * 
mapStateToProps - If this argument is specified, the new component will subscribe to Redux store updates. This means that any time 
the store is updated, mapStateToProps will be called. The results of mapStateToProps 
must be a plain object, which will be merged into the component’s props. If you don't 
want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

mapDispatchToProps - If an object is passed, each function inside it is assumed to be a 
Redux action creator. An object with the same function names, but with every action creator 
wrapped into a dispatch call so they may be invoked directly, will be merged into the 
component’s props. If a function is passed, it will be given dispatch as the first 
parameter. It’s up to you to return an object that somehow uses dispatch to bind action 
creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.)
https://redux.js.org/api/bindactioncreators
 */