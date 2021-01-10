/* When React Router renders this component, it is going to pass to it the specific URL 
parameter as match.params.id*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends Component {

    render() {
        //console.log(this.props) //to confirm we have the data that mapStateToProps returns is what we want
        const { id, replies } = this.props
        return(
            <div>
                {/*The tweet the user wants to reply to */}
                <Tweet id={id} />
                {/*The user can write the new reply he or she wants*/}
                <NewTweet id={id} />
                {//list of replies for this tweet
                replies.length !== 0 && <h3 className='center'>Replies</h3>}
                <ul>
                    {replies.map((replyId) => (
                    <li key={replyId}>
                        <Tweet id={replyId}/>
                    </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ tweets }, props) => {
    const { id } = props.match.params //remember this is manually coming from us for now

    return {
        id,
        //we need to show every list of relies to this tweet if available
        replies: !tweets[id]
          ? []
          : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)