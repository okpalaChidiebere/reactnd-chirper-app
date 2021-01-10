import { RECEIVE_TWEETS, TOGGLE_LIKE, ADD_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_LIKE :
      return {
        ...state, //we dont want to mutate the store, so we spread the previous tweets on object
        [action.id]: {
          ...state[action.id],
          //we add a user to the likes array or remove a user from the likes array of they have already liked it
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser) //remove
            : state[action.id].likes.concat([action.authedUser]) //add
        }
      }
    case ADD_TWEET :
      const { tweet } = action

      let replyingTo = {}
      /*We want to go to the array property(replies) if we are replying to a tweet and add the 
      tweetId there as well */
      if (tweet.replyingTo !== null) {
        /*At this point an already existing tweet needs to be modified */

        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyTo].replies.concat([tweet.id]) //we go the reply array of the tweet we are replying to and add the id of this new tweet we posted
          }
        }
      }

      
      return {
        ...state,
        [action.tweet.id]: action.tweet, //adding our new tweet to our new tweet state to the tweets slice state
        ...replyingTo, //spread the modified existing tweet across our new tweets state
      }
    default :
      return state
  }
} 