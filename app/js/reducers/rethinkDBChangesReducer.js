
import { handleActions } from 'redux-actions'

function reducer(state, { payload: objects }) {
  if (objects.length === 0)
    return state

  const newState = {...state}

  objects.forEach(o => {
    if (o.new_val) {
      /* Add or update */
      newState[o.new_val.id] = o.new_val

    } else if (o.new_val === null && o.old_val) {
      /* Delete */
      delete newState[o.old_val.id]
    }    
  })

  return newState
}

export default (event) => {

  const initialState = null
  const reducers = {
    [event]: reducer,
  }

  return handleActions(reducers, initialState)
}

