import * as questionsStore from '../../../client/store/questions'

describe('questions store - actions, thunk, and reducer', () => {
  const questions = [{id: 1, question: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?'}, {id: 2, question: 'Why is the sky blue?'}]
  describe('actions', () => {
    it('should create an action to add the questions', () => {
      const expectedAction = {
        type: questionsStore.GET_ALL_QUESTIONS,
        questions
      }
      expect(questionsStore.getAllQuestions(questions)).toEqual(expectedAction)
    })
  })
})
