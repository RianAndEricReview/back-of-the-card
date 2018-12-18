// Used to scroll to the top of a page. Invoke in the onLoad to get a page to start at the top.
export const topOfPageStart = () => {
  window.scroll(0, 0)
}

//used for running/displaying a countdown
export const countdown = (initialCount, setCounterFunc) => {
  let seconds = initialCount
  const countdownInterval = setInterval(() => {
    setCounterFunc(--seconds)
    if (!seconds) {
      clearInterval(countdownInterval)
    }
  }, 1000)
}