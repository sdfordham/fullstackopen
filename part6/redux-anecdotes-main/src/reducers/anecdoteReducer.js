import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.anecdotes
    case 'ADD_LIKE':
      return state.map(a =>
        a.id === action.data.id
          ? { ...a, votes: action.data.currentLikes + 1 }
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

export const addLike = (id, currentLikes) => {
  return async dispatch => {
    const res = await anecdotesService.addLike(id, currentLikes)
    dispatch({
      type: 'ADD_LIKE',
      data: { id, currentLikes}
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      anecdote
    })
  }
}

export default anecdoteReducer
