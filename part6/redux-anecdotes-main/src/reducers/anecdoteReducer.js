import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.anecdotes
    case 'ADD_LIKE':
      return state.map(a =>
        a.id === action.id
          ? { ...a, votes: a.votes + 1 }
          : a
      )
    case 'ADD_ANECDOTE':
      return state.concat(action.anecdote)
    default: return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes,
    })
  }
}

export const addLike = (id) => {
  return {
    type: 'ADD_LIKE',
    id
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    anecdote
  }
}

export default anecdoteReducer
