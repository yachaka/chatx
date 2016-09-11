
import identity from 'identity-function'
import { handleActions } from 'redux-actions'

/*
 * actions object must be of shape :
 * {
 *    INSERT: 'ACTION_TYPE',
 *    DELETE: 'ACTION_TYPE',
 * }
 */

export default function createIDMapperReducer(
  actions,
  initialState = null,
  getID = o => o.id,
  getObj = identity
) {
  if (!actions.INSERT || !actions.DELETE)
    throw new Error('No INSERT type or DELETE type specified in a call to createIDMapperReducer')

  const reducers = {

    [actions.INSERT]: (state, { payload: objects }) => {
      return objects.reduce((state, object) => {
        state[getID(object)] = getObj(object)
        
        return state
      }, {...state})
    }
  }

  return handleActions(reducers, initialState)
}