
import { expect } from 'chai'

import createStore from '../createStore'
import { selectRooms } from '../selectors'

describe('selectors', () => {
  const store = createStore({})

  it('should correctly select the rooms key', () => {
    expect(selectRooms(store.getState())).to.not.equal(undefined)
  })
})
