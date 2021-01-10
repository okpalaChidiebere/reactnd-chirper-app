import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading' //for showing the loading bar when the user is adding a new tweet

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const ADD_TWEET = 'ADD_TWEET'

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  tweet,
})

export const handleAddTweet = (text, replyingTo) => async (dispatch, getState) => {

  const { authedUser } = getState() //getState method returns the current state of our store

  try{
    dispatch(showLoading())
    const tweet = await saveTweet({ text, author: authedUser, replyingTo })
    dispatch(addTweet(tweet))
    dispatch(hideLoading())
  }catch(e){
    console.warn('Error in handleAddTweet: ', e)
    alert('There was an error adding the tweet. Try again.')
  }
}


//receive tweets action creator
export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

const toggleLike = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_LIKE,
  id,
  authedUser,
  hasLiked
})

export const handleToggleLike = (info) => async (dispatch) => {

  try {
    /*We are using Optimistic Updates in this operation */
    dispatch(toggleLike(info))
    await saveLikeToggle(info)

  }catch(e){
    console.warn('Error in handleToggleTweet: ', e)
    dispatch(toggleLike(info)) //we dispatch ogleLike one more time so that it will reset back to what it initially was
    alert('There was an error liking the tweet. Try again.')
  }
}