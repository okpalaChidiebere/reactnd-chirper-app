import { RECEIVE_TWEETS, TOGGLE_LIKE } from '../actions/tweets'

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
    default :
      return state
  }
} 