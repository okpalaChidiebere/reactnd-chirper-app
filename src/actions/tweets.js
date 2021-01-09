import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'

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