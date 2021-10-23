const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data.message
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: { message }
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default notificationReducer
