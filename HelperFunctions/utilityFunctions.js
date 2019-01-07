// Used to scroll to the top of a page. Invoke in the onLoad to get a page to start at the top.
export const topOfPageStart = () => {
  window.scroll(0, 0)
}

//used for running/displaying a countdown ticker with dynamic time between ticks
export const countdown = (initialCount, millisecondsPerTick, setCounterFunc) => {
  let ticks = initialCount
  const countdownInterval = setInterval(() => {
    setCounterFunc(--ticks)
    if (!ticks) {
      clearInterval(countdownInterval)
    }
  }, millisecondsPerTick)
}

//used to turn 3,2,1 part of countdown into text
export const countdownTextConverter = (countdownNum, ...args) => {
  if (countdownNum > args.length) return countdownNum
  return args.reverse()[countdownNum - 1]
}

