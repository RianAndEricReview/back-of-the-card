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

const derivedBattingStats = [{statCat: 'BA', attributes: ['hits', 'AB']}]

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
  derivedBattingStats
}
