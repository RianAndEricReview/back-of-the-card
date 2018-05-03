import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../../client/history'
import {meThunk, logOutThunk} from '../../../client/store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunk creators', () => {
  let store, mockAxios
  const initialState = {user: {}}
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('meThunk', () => {
    it('dispatches the GET_USER action', () => {
      const fakeUser = {email: 'bob@bob.bob'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      return store.dispatch(meThunk())
      .then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_USER')
        expect(actions[0].user).to.be.deep.equal(fakeUser)
      })
    })
  })

  describe('logOutThunk', () => {
    it('dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      return store.dispatch(logOutThunk())
      .then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('REMOVE_USER')
        expect(history.location.pathname).to.be.equal('/login')
      })
    })
  })
})
