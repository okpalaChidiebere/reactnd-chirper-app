import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

//We did not implement authentication in this app
//we hard coded this, so we dont have to worry about authentication in this app
const AUTHED_ID = 'tylermcginnis'


export const handleInitialData = () => async (dispatch) => {

    try {

        dispatch(showLoading())
        const { users, tweets } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID)) //we dispatch setting the username as the authedUser in our Redux store
        dispatch(hideLoading())
    }catch(e){
        console.log('ERROR!', e)
        alert("Error fetching data")
    }
}