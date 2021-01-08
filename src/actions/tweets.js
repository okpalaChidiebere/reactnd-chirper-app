export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

//receive tweets action creator
export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}