import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti'
import { TiHeartOutline } from 'react-icons/ti'
import { TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleLike } from '../actions/tweets'

class Tweet extends Component {

    handleLike = (e) => {
        e.preventDefault()
    
        //Note we this component already has access to the dispatch function because, it's a Container component. The connect method from react-redux pkg makes the possible 
        const { dispatch, tweet, authedUser } = this.props
        
        dispatch(handleToggleLike({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }

    toParent = (e, id) => {
        e.preventDefault()
        // todo: Redirect to main parent Tweet that we are replying to.
    }

    render(){

        const { tweet } = this.props
        
        if (tweet === null) {
            return <p>This Tweet doesn't existd</p>
        }

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent
        } = tweet

        console.log(this.props) //to confirm that we are getting the information of every tweet we are going to be rendring

        return(
            <div className='tweet'>
                <img
                src={avatar}
                alt={`Avatar of ${name}`}
                className='avatar'
            />
            <div className='tweet-info'>
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {/*This could be null, so we only redner this when this property exists*/
                    parent && (
                    <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                    Replying to @{parent.author}
                    </button>
                    )}
                    <p>{text}</p>
                </div>
                {/* Div for reply and linke buttons */}
                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon' />
                    <span>{/*If the tweet has 0 replies we dont show the replies count */
                    replies !== 0 && replies}</span>
                    <button className='heart-button' onClick={this.handleLike}>
                    {hasLiked === true
                    ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                    : <TiHeartOutline className='tweet-icon'/>}
                    </button>
                <span>{ /*If the tweet has 0 likes we dont show the likes count */
                likes !== 0 && likes}</span>
          </div>
        </div>
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