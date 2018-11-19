
//Initial State
const playerQuestionResults = []

//ACTION TYPES
export const CLEAR_QUESTION_RESULTS = 'CLEAR_QUESTION_RESULTS'
export const CREATE_QUESTION_RESULT = 'CREATE_QUESTION_RESULT'

//ACTION CREATORS
export const clearQuestionResults = () => ({ type: CLEAR_QUESTION_RESULTS })
export const createQuestionResult = questionResult => ({ type: CREATE_QUESTION_RESULT, questionResult })

//REDUCERS
export default function questionResultsReducer(state = playerQuestionResults, action) {
  switch (action.type) {
    case CLEAR_QUESTION_RESULTS:
      return []
    case CREATE_QUESTION_RESULT:
      return [...state, action.questionResult]
    default:
      return state
  }
}
