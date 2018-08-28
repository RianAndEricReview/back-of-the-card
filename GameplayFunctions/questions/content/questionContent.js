const sequelize = require('sequelize')
//THIS FILE CONTAINS CONTENT TO BE USED TO FILL IN THE QUESTION OBJECT

//Array with weighted year ranges used to select a specific year for question.
const defaultYearRanges = [
  {start: 1871, end: 1909, weight: 2},
  {start: 1910, end: 1919, weight: 5},
  {start: 1920, end: 1939, weight: 15},
  {start: 1940, end: 1949, weight: 5},
  {start: 1950, end: 1969, weight: 15},
  {start: 1970, end: 1979, weight: 30},
  {start: 1980, end: 1989, weight: 50},
  {start: 1990, end: 2017, weight: 125},
]

// minPA to qualify for batting title in a given year
const minPAPerYear = [
  {start: 1900, end: 1903, minPA: 434},
  {start: 1904, end: 1918, minPA: 477},
  {start: 1919, end: 1919, minPA: 434},
  {start: 1920, end: 1960, minPA: 477},
  {start: 1961, end: 1994, minPA: 502},
  {start: 1995, end: 1995, minPA: 446}
]

const requiredAttributes = [
  [sequelize.fn('SUM', sequelize.col('AB')), 'AB'],
  [sequelize.fn('SUM', sequelize.col('hits')), 'hits'],
  [sequelize.fn('SUM', sequelize.col('PA')), 'PA'],
  [sequelize.fn('MIN', sequelize.col('year')), 'year'],
]


const derivedStats = [{name: 'adjBA', attributes: ['AB', 'PA']}]

//This object will contain all question skeleton functions.
//Once a seleton is chosen it will use the data from the QuestionChoices object to create the question text for the Question objects.
const questionSkeletons = {
  statQuestionSkeleton: function(skeletonKey){
    const comparativePhrasing = (skeletonKey.comparativePhrasing) ? skeletonKey.comparativePhrasing[Math.floor(Math.random() * skeletonKey.comparativePhrasing.length)] : ''
    const subjectNoun = (skeletonKey.subjectNoun) ? skeletonKey.subjectNoun[Math.floor(Math.random() * skeletonKey.subjectNoun.length)] : ''
    const pluralization = (skeletonKey.pluralization) ? skeletonKey.pluralization[Math.floor(Math.random() * skeletonKey.pluralization.length)] : ''
    const verb = (skeletonKey.verb) ? skeletonKey.verb[Math.floor(Math.random() * skeletonKey.verb.length)] : ''
    const ordinal = (skeletonKey.ordinal) ? skeletonKey.ordinal[Math.floor(Math.random() * skeletonKey.ordinal.length)] : ''
    const mostOrLeast = (skeletonKey.mostOrLeast) ? skeletonKey.mostOrLeast[Math.floor(Math.random() * skeletonKey.mostOrLeast.length)] : ''
    const objectNoun = (skeletonKey.objectNoun) ? skeletonKey.objectNoun[Math.floor(Math.random() * skeletonKey.objectNoun.length)] : ''
    const timeFrame = (skeletonKey.timeFrame) ? skeletonKey.timeFrame[Math.floor(Math.random() * skeletonKey.timeFrame.length)] : ''
    const year = (skeletonKey.year) ? skeletonKey.year : ''
    return `Which ${comparativePhrasing} ${subjectNoun}${pluralization} ${verb} the ${ordinal} ${mostOrLeast} ${objectNoun}${timeFrame}${year}?`
  }
}

module.exports = {
  defaultYearRanges,
  questionSkeletons,
  minPAPerYear,
  requiredAttributes,
  derivedStats
}

//THOUGHT SPACE AS DESIGNS EVOLVED
//very rough, placeholder question skeletons. Probably won't need phrasing array.
// const questionCat1 = {
//   phrasing: ['homerun', 'player', 'singleYear', 'most', 'league'],
//   text: [`who led the ${this.league} in homeruns in ${this.year}?`, `In ${this.year}, which player smacked the most dingers in the ${this.league}`]
// }

// const question2 = {
//   phrasing: ['homeruns', 'yearRange', 'most']
// }

// text: [`What manager led the ${this.team} to the ${this.title} title in ${this.year}?`, `In ${this.year}, who skippered the ${this.team} to win the ${this.title} crown?`, `The ${this.year} manager of the ${this.team} captained them to the ${this.title} championship. Name him.`]
// phrasing: ['title', 'league', 'specificYear']

// text: [`In ${this.year}, what player led the ${this.league} in homeruns per at bat (min xxx ABs)?`, `What player lead the ${this.league} in ${this.year} when he hit a homerun every X at bats?`, `X player led the ${this.league} when he hit a homerun every X times he came to the plate in ${this.year`]
// phrasing: ['homeruns', 'at bats', 'league', 'specificYear']

// text: [`Who is Xth position all time in doubles for a career?`, `What player holds the all-time record for most two-baggers over the course of their career?`, `This player is Xth in MLB history with Y doubles over the course of his career.`]
// phrasing: ['doubles', 'career', 'most']
