import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll()
    .then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
