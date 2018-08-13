//THIS FILE CONTAINS ALL HELPER FUNCTIONS NEEDED TO CREATE QUESTIONS.

//this helper function is used to pick a random value from an array based on weight prop of object
export const randomValueSelector = (arr) => {
  const totalWeight = arr.reduce((accum, currObj) => {
    return accum + currObj.weight
  }, 0)

  let currentNum = 0;
  const targetNum = Math.floor(Math.random() * totalWeight) + 1

  for (let i = 0; i < arr.length; i++) {
    currentNum += arr[i].weight
    if (targetNum <= currentNum) {
      return arr[i]
    }
  }
}

//this helper function is used to pick a year from a weighted range of year options.
export const randomYearSelector = (years) => {
  const yearRange = randomValueSelector(years)

  return Math.floor(Math.random() * (yearRange.end - yearRange.start + 1)) + yearRange.start
}


export const yearRangesArr = [
  {start: 1871, end: 1909, weight: 2},
  {start: 1910, end: 1919, weight: 5},
  {start: 1920, end: 1939, weight: 15},
  {start: 1940, end: 1949, weight: 5},
  {start: 1950, end: 1969, weight: 15},
  {start: 1970, end: 1979, weight: 30},
  {start: 1980, end: 1989, weight: 50},
  {start: 1990, end: 2017, weight: 125},
]
