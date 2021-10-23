import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers(
  {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
)

const store = createStore(reducer)
console.log(store.getState())

export default store
