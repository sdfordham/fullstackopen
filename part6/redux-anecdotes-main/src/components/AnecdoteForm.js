import React from 'react'
import anecdoteService from '../services/anecdotes'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.create.value
    event.target.create.value = ''
    dispatch(addAnecdote(anecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name='create'/></div>
        <button>create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm
