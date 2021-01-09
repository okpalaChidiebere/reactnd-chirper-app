import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers' //due to we did not specify the file, the system will import the default export coming from the /reducers/index.js file(were we ivoked combineReducers) for us and export the result of use
import middleware from './middleware' //import expects a default export coming from /middleware/index.js(wehere we invoke applyMiddleware) file to exist which we have

const store = createStore(reducer, middleware)

ReactDOM.render(
 <Provider store={store}>
    <App />
 </Provider>,
 document.getElementById('root'))

 /**
    Index.Js is where we want to actually create our store(or you can manage your 
    store store in another folder in a case where you have different store and reducers 
    for prod and dev database) and wrap our app inside of the provider component so that 
    we can pass it our store
    https://github.com/reduxjs/redux/tree/master/examples/real-world
  */