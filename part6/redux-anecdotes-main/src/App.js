import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import reducer, { addLike, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(addLike(id))
  }

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name='create'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
