import axios from 'axios'

//Initial State
const defaultQuestions = []

//ACTION TYPES
export const CREATE_ALL_QUESTIONS = 'CREATE_ALL_QUESTIONS'
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'

//ACTION CREATORS
export const createAllQuestions = questions => ({ type: CREATE_ALL_QUESTIONS, questions })
export const getAllQuestions = questions => ({ type: GET_ALL_QUESTIONS, questions })

//THUNK CREATORS
export const createAllQuestionsThunk = (gameId, numOfQuestions) =>
  dispatch => axios.post(`/api/games/${gameId}/questions`, { numOfQuestions })
    .then(res => res.data)
    .then(questions => {
      dispatch(createAllQuestions(questions))
    })
    .catch(err => console.log(err))

export const getAllQuestionsThunk = (gameId) =>
  dispatch => axios.get(`/api/games/${gameId}/questions`)
    .then(res => res.data)
    .then(questions => {
      dispatch(getAllQuestions(questions))
    })
    .catch(err => console.log(err))

//REDUCERS
export default function questionReducer(state = defaultQuestions, action) {
  switch (action.type) {
    case CREATE_ALL_QUESTIONS:
      return action.questions
    case GET_ALL_QUESTIONS:
      return action.questions
    default:
      return state
  }
}
