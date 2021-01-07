import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

/*We use this file to interact with the _DATA.js(fake server) file
As you can see we imported those methods. But ideally you will have your real server that you send payload and all that */
export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getTweets(),
  ]).then(([users, tweets]) => ({
    users,
    tweets,
  }))
}

//toggle the like button of a tweet
export function saveLikeToggle (info) {
  return _saveLikeToggle(info)
}

//save a tweet
export function saveTweet (info) {
  return _saveTweet(info)
}