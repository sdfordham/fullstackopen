const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    case 'ADD_LIKE':
      return state.map(a =>
        a.id === action.data.id
          ? { ...a, votes: a.votes + 1 }
          : a
      )
    case 'ADD_ANECDOTE':
      return state.concat(action.data.content)
    default: return state
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes }
  }
}

export const addLike = (id) => {
  return {
    type: 'ADD_LIKE',
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { content }
  }
}

export default anecdoteReducer
