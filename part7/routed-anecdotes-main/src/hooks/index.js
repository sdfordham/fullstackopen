import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    const reset = (event) => {
      setValue('')
    }

    return {
      reset: reset,
      formEls: {
        type,
        value,
        onChange
      }
    }
  }
