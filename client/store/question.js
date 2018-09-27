import axios from 'axios'

//Initial State
const defaultQuestions = []

//ACTION TYPES
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'

//ACTION CREATORS
export const getAllQuestions = questions => ({ type: GET_ALL_QUESTIONS, questions })

//THUNK CREATORS
export const getAllQuestionsThunk = (gameId) =>
  dispatch => axios.get(`/api/games/${gameId}/question`)
    .then(res => res.data)
    .then(questions => {
      dispatch(getAllQuestions(questions))
    })
    .catch(err => console.log(err))

//REDUCERS
export default function questionReducer(state = defaultQuestions, action) {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.questions
    default:
      return state
  }
}
