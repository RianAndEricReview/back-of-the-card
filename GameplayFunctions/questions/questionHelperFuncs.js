//THIS FILE CONTAINS ALL HELPER FUNCTIONS NEEDED TO CREATE QUESTIONS.
const { minPAPerYear } = require('./content/questionContent')

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


//Creates the result array of player objects, in the proper order, to be used to select answers.
const dataConsolidator = (data, questionChoices, isDerived) => {
  switch (true) {
    case (questionChoices.timeFrame === 'allTime' && !!isDerived && questionChoices.teamOrPlayer === 'singlePlayer' && questionChoices.mostOrLeast === 'most'):
      return data.map(entry => {
        return { ...entry.dataValues, [questionChoices.statCategory]: entry[questionChoices.statCategory] }
      }).filter(entry => (entry.PA >= 3000)).sort((a, b) => { return b[questionChoices.statCategory] - a[questionChoices.statCategory] })

    case (questionChoices.timeFrame === 'allTime' && !!isDerived && questionChoices.teamOrPlayer === 'singlePlayer' && questionChoices.mostOrLeast === 'least'):
      return data.map(entry => {
        return { ...entry.dataValues, [questionChoices.statCategory]: entry[questionChoices.statCategory] }
      }).filter(entry => (entry.PA >= 3000)).sort((a, b) => { return a[questionChoices.statCategory] - b[questionChoices.statCategory] })

    case (questionChoices.timeFrame === 'singleSeason' && !!isDerived && questionChoices.teamOrPlayer === 'singlePlayer' && questionChoices.mostOrLeast === 'most'):
      return data.map(entry => {
        return { ...entry.dataValues, [questionChoices.statCategory]: entry[questionChoices.statCategory] }
      }).sort((a, b) => { return b[questionChoices.statCategory] - a[questionChoices.statCategory] })

    case (questionChoices.timeFrame === 'singleSeason' && questionChoices.mostOrLeast === 'least' && questionChoices.teamOrPlayer === 'singlePlayer'):
      let minPA = 502
      // Used to set the required minimum plate appearances based on the year
      for (let i = 0; i < minPAPerYear.length; i++) {
        if (questionChoices.questionSkeletonKey.year >= minPAPerYear[i].start && questionChoices.questionSkeletonKey.year <= minPAPerYear[i].end) {
          minPA = minPAPerYear[i].minPA
          break
        }
      }
      return data.map(entry => {
        if (!isDerived) {
          return entry.dataValues
        } else {
          return { ...entry.dataValues, [questionChoices.statCategory]: entry[questionChoices.statCategory] }
        }
      }).filter(entry => (entry.PA >= minPA))

    default:
      return data.map(entry => {
        return entry.dataValues
      })
  }
}

module.exports = {
  randomYearSelector,
  randomValueSelector,
  dataConsolidator,
}
