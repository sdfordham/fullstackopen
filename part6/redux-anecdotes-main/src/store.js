import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers(
  {
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
)

const store = createStore(reducer)
console.log(store.getState())

export default store
