
//Initial State
const countdownClock = null

//ACTION TYPES
export const SET_COUNTDOWN_CLOCK = 'SET_COUNTDOWN_CLOCK'
export const DECREMENT_COUNTDOWN_CLOCK = 'DECREMENT_COUNTDOWN_CLOCK'

//ACTION CREATORS
export const setCountdownClock = numOfSeconds => ({ type: SET_COUNTDOWN_CLOCK, numOfSeconds })
export const decrementCountdownClock = () => ({ type: DECREMENT_COUNTDOWN_CLOCK })

//REDUCERS
export default function countdownClockReducer(state = countdownClock, action) {
  switch (action.type) {
    case SET_COUNTDOWN_CLOCK:
      return action.numOfSeconds
    case DECREMENT_COUNTDOWN_CLOCK:
      return countdownClock - 1
    default:
      return state
  }
}
