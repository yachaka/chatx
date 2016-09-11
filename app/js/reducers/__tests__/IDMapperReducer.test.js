
import { expect } from 'chai'
import { createAction } from 'redux-actions'

import createIDMapperReducer from '../IDMapperReducer'

const DUMMY_INSERT = 'DUMMY_INSERT'
const DUMMY_DELETE = 'DUMMY_DELETE'
const dummyInsert = createAction(DUMMY_INSERT)

describe('IDMapperReducer', () => {

  describe('default opts', () => {
    let reducer = createIDMapperReducer({ INSERT: DUMMY_INSERT, DELETE: DUMMY_DELETE })

    it('should correctly insert new objects identified by ID', () => {
      let initial = null
      let batch = [
        {id: 1, name: 'Dummy object 1'},
        {id: 2, name: 'Dummy object 2'},
        {id: 3, name: 'Dummy object 3'},
      ]

      let state = reducer(initial, dummyInsert(batch))
      expect(state).to.deep.equal({
        1: batch[0],
        2: batch[1],
        3: batch[2],
      })
    })

    it('should correctly replace an object identified by its ID', () => {
      let initial = {
        2: {id: 2, name: 'Dummy object no update :('},
      }
      let batch = [
        {id: 2, name: 'Dummy object 2 got updated'}
      ]

      let state = reducer(initial, dummyInsert(batch))
      expect(state['2']).to.deep.equal(batch[0])
    })

    it('should correctly update and insert at the same time', () => {
      let initial = {
        1: {id: 1, name: 'Dummy object 1'},
        2: {id: 2, name: 'Dummy object 2'},
        3: {id: 3, name: 'Dummy object 3'},
      }
      let batch = [
        {id: 1, name: 'Update 1 lol !'},
        {id: 4, name: 'This one is getting inserted'}
      ]

      let state = reducer(initial, dummyInsert(batch))
      expect(Object.keys(state).length).to.be.equal(4)
      expect(state).to.deep.equal({
        1: batch[0],
        2: initial[2],
        3: initial[3],
        4: batch[1],
      })
    })
  })

  describe('custom ID getter function, Obj getter function and initial state', () => {
    const initialState = {
      'John': {name: 'John', text: 'I\'m initial'}
    }

    let getObjFn = (obj) => ({...obj, random: 'this is added'})

    let reducer = createIDMapperReducer({ INSERT: DUMMY_INSERT, DELETE: DUMMY_DELETE }, initialState, (obj) => obj.name, getObjFn)
    let state

    it('should correctly returns the initial state specified in the factory', () => {
      let state = reducer(undefined, { type: 'Not important', payload: 'Foo'})
      expect(state).to.deep.equal(initialState)
    })

    it('should correctly insert and update with a custom ID mapper and custom obj getter', () => {
      let batch = [
        {name: 'John', text: 'I\'m updated'},
        {name: 'Ilyes', text: 'Awesome guy 100'},
        {name: 'Dummy', text: 'Dummy text'},
      ]

      let state = reducer(null, dummyInsert(batch))
      expect(Object.keys(state).length).to.be.equal(3)
      expect(state).to.deep.equal({
        'John': getObjFn(batch[0]),
        'Ilyes': getObjFn(batch[1]),
        'Dummy': getObjFn(batch[2]),
      })
    })
  })
})