import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk, //which takes the functions and executes them, thereby obtaining actions to pass to the reducers
  logger,
)

/*
It’s important to note that the value of the next parameter will be determined by the 
applyMiddleware function. Why? All middleware will be called in the order it is listed 
in that function. In our case, the next will be dispatch because logger is the last 
middleware listed in that function.

if you have logger befor thunk, the behaviour of the middleware will be different
*/