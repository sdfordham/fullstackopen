const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      var {good, ...rest} = state
      return {good: good + 1, ...rest}
    case 'NEUTRAL':
      var {neutral, ...rest} = state
      return {neutral: neutral + 1, ...rest}
    case 'BAD':
      var {bad, ...rest} = state
      return {bad: bad + 1, ...rest}
    case 'ZERO':
      return initialState
    default: return state
  }
}

export default counterReducer
