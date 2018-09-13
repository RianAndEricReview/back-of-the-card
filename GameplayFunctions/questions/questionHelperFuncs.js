//THIS FILE CONTAINS ALL HELPER FUNCTIONS NEEDED TO CREATE QUESTIONS.

//this helper function is used to pick a random value from an array based on weight prop of object
const randomValueSelector = (arr) => {
  const totalWeight = arr.reduce((accum, currObj) => {
    return accum + currObj.weight
  }, 0)

  let currentNum = 0
  const targetNum = Math.floor(Math.random() * totalWeight) + 1

  for (let i = 0; i < arr.length; i++) {
    currentNum += arr[i].weight
    if (targetNum <= currentNum) {
      return arr[i]
    }
  }
}

//this helper function is used to pick a year from a weighted range of year options.
const randomYearSelector = (years) => {
  const yearRange = randomValueSelector(years)

  return Math.floor(Math.random() * (yearRange.end - yearRange.start + 1)) + yearRange.start
}

module.exports = {
  randomYearSelector,
  randomValueSelector
}
