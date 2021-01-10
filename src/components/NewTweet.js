/*
This is a controlled component meaning React is going to be in control of the text input 
field. The reason is because, when there is no text, the submit button is disables but 
when there is a text, we enabke the submit button

The reason, we we using React component state over Redux state ist because it is easier, and putting
this form state inside of redux will not give us any benefits. Infact it will be more complicated rather
than putting things inside of the component state.

Remember in Redux we dont want our operations to me complicated

Nevertheless, if the state `text` was going to be shared with a few diferent components or if we needed
to pass this state down as props to different layers then we might think about using Redux state
This is fine here as a React state because we are not using this anywhere else inside of our app


Our Ui consists of Header, text area and the sumbit button
*/

import React, { Component } from 'react'

class NewTweet extends Component {
  state = {
    text: '',
  }
  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state

    // todo: Eventually we will add Tweet to Store

    console.log('New Tweet: ', text)

    this.setState(() => ({
      text: ''
    }))
  }
  render() {
    const { text } = this.state

    {/* todo: Redirect to / if submitted */}

    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          { //show warning to the user when they start to enter more than 289 characters
          tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default NewTweet 
