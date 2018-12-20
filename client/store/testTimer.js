
//Initial State
const testTimer = false

//ACTION TYPES
export const UPDATE_GP_MOUNTED = 'UPDATE_GP_MOUNTED'

//ACTION CREATORS
export const updateGPMounted = status => ({ type: UPDATE_GP_MOUNTED, status })

//REDUCERS
export default function allPlayerAnswersReducer(state = testTimer, action) {
  switch (action.type) {
    case UPDATE_GP_MOUNTED:
      return action.status
    default:
      return state
  }
}
