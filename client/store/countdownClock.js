
//Initial State
const countdownClock = null

//ACTION TYPES
export const SET_COUNTDOWN_CLOCK = 'SET_COUNTDOWN_CLOCK'

//ACTION CREATORS
export const setCountdownClock = numOfSeconds => ({ type: SET_COUNTDOWN_CLOCK, numOfSeconds })

//REDUCERS
export default function countdownClockReducer(state = countdownClock, action) {
  switch (action.type) {
    case SET_COUNTDOWN_CLOCK:
      return action.numOfSeconds
    default:
      return state
  }
}
