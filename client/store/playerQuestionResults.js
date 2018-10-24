import axios from 'axios'

//Initial State
const playerQuestionResults = []

//ACTION TYPES
export const SAVE_AND_CLEAR_QUESTION_RESULTS = 'SAVE_AND_CLEAR_QUESTION_RESULTS'
export const CREATE_QUESTION_RESULT = 'CREATE_QUESTION_RESULT'

//ACTION CREATORS
export const saveAndClearQuestionResults = () => ({ type: SAVE_AND_CLEAR_QUESTION_RESULTS })
export const createQuestionResult = questionResult => ({ type: CREATE_QUESTION_RESULT, questionResult })

//THUNK CREATORS
export const saveAllQuestionResultsThunk = (questionResults, userId) =>
  dispatch => axios.post(`/api/users/${userId}/questionResults`, { questionResults })
    .then(res => res.data)
    .then(() => {
      dispatch(saveAndClearQuestionResults())
    })
    .catch(err => console.log(err))

//REDUCERS
export default function questionResultsReducer(state = playerQuestionResults, action) {
  switch (action.type) {
    case SAVE_AND_CLEAR_QUESTION_RESULTS:
      return []
    case CREATE_QUESTION_RESULT:
      return [...state, action.questionResult]
    default:
      return state
  }
}
