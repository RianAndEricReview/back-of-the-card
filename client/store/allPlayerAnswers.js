
//Initial State
const allPlayerAnswers = []

//ACTION TYPES
export const ADD_PLAYER_ANSWER = 'ADD_PLAYER_ANSWER'
export const CLEAR_ALL_PLAYER_ANSWERS = 'CLEAR_ALL_PLAYER_ANSWERS'

//ACTION CREATORS
export const addPlayerAnswer = playerAnswer => ({ type: ADD_PLAYER_ANSWER, playerAnswer })
export const clearAllPlayerAnswers = () => ({ type: CLEAR_ALL_PLAYER_ANSWERS })

//REDUCERS
export default function allPlayerAnswersReducer(state = allPlayerAnswers, action) {
  switch (action.type) {
    case ADD_PLAYER_ANSWER:
      return [...state, action.playerAnswer]
    case CLEAR_ALL_PLAYER_ANSWERS:
      return []
    default:
      return state
  }
}
