//THIS FILE CONTAINS CONTENT TO BE USED TO FILL IN THE QUESTION OBJECT

//Array with weighted year ranges used to select a specific year for question.
export const defaultYearRangesArr = [
  {start: 1871, end: 1909, weight: 2},
  {start: 1910, end: 1919, weight: 5},
  {start: 1920, end: 1939, weight: 15},
  {start: 1940, end: 1949, weight: 5},
  {start: 1950, end: 1969, weight: 15},
  {start: 1970, end: 1979, weight: 30},
  {start: 1980, end: 1989, weight: 50},
  {start: 1990, end: 2017, weight: 125},
]


//This object will contain all question skeletons.
//Once a seleton is chosen it will use the data from the QuestionChoices object to create the question text for the Question objects.
export const questionSkeletons = {
  statQuestionSkeleton: `Which ${comparativePhrasing} ${subjectNoun}${pluralization} ${verb} the ${ordinal} ${mostOrLeast} ${objectNoun} ${timeFrame}?`
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

