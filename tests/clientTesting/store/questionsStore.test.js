import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as questionsStore from '../../../client/store/questions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('questions store - actions, thunk, and reducer', () => {
  const questions = [{ id: 1, question: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?' }, { id: 2, question: 'Why is the sky blue?' }]

  describe('actions', () => {
    it('should create an action to add the questions', () => {
      const expectedAction = {
        type: questionsStore.GET_ALL_QUESTIONS,
        questions
      }
      expect(questionsStore.getAllQuestions(questions)).toEqual(expectedAction)
    })
    it('should create an action to clear the questions', () => {
      const expectedAction = {
        type: questionsStore.CLEAR_ALL_QUESTIONS
      }
      expect(questionsStore.clearAllQuestions()).toEqual(expectedAction)
    })
  })

  describe('getAllQuestionsThunk', () => {
    const store = mockStore({ defaultQuestions: [] })
    const mockAxios = new MockAdapter(axios)

    afterEach(() => {
      store.clearActions()
    })
    it('creates and dispatches the GET_ALL_QUESTIONS action', () => {
      mockAxios.onGet('/api/games/1/questions').replyOnce(200, questions)
      return store.dispatch(questionsStore.getAllQuestionsThunk(1))
        .then(() => {
          const expectedActions = [{
            type: questionsStore.GET_ALL_QUESTIONS,
            questions
          }]
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('questionReducer', () => {
    it('should return empty initial state', () => {
      expect(questionsStore.default(undefined, {})).toEqual([])
    })
    it('should handle GET_ALL_QUESTIONS', () => {
      expect(questionsStore.default([], {type: questionsStore.GET_ALL_QUESTIONS, questions})).toEqual(questions)
    })
  })
})

// REMINDER TO PUT THIS BACK IN THE TEST SCRIPT
// mocha ./tests/serverTesting/**/*.spec.js --require @babel/polyfill --require @babel/register &&
