import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'

class Tweet extends Component {

    render(){

        const { tweet } = this.props
        
        if (tweet === null) {
            return <p>This Tweet doesn't existd</p>
        }

        console.log(this.props) //to confirm that we are getting the information of every tweet we are going to be rendring

        return(
            <div>

            </div>
        )

    }
}

//We always ask, what state do this component needs fro our Redux store, that is what we pass in the first argument
//for, the second argument is ourOwnProps, if you pass the Component you are rendering a prop (eg the Dashboard will pass an ID as prop, to this Component), that is what you will get as the second argument
//never do API call inside this method. If you want to do API call, consider using the mapDispatchToProps
//function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?) 
const mapStateToProps = ( {authedUser, users, tweets}, { id } ) => {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    
    return {
    authedUser, //we this be used, so that whenever the authenticated user respond or liked a tweet, we know who the user is
    tweet: tweet //we have to check is the tweet with id exisits
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
    }
}

export default connect(mapStateToProps)(Tweet)