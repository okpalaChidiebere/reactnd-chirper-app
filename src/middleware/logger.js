/*
We want logger to show us anytime an action is dispatched
as well as what the new state is going to be after the action is dispatched
*/
const logger = (store) => (next) => (action) => {
    console.group(action.type)
      console.log('The action: ', action)
      const returnValue = next(action) //this will update the state tree because we are invoking the dispatched action itself. The reason, we invoke the dispatch here is because, this function will be the last middleware to execut in the order we will place them in applyMiddleware Redux method. Look at the index file
      console.log('The new state: ', store.getState()) //get can log what the next state will be because we invoked the dispatch in the previous line of code
    console.groupEnd()
    return returnValue
}
  
export default logger 