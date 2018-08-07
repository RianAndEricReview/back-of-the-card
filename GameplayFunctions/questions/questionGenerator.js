import { stat } from "fs";

// example arrays for questionChoice functions
// const seasonOrCareerArray = [{ value: 'singleSeason', weight: 4, nextChoice: teamPlayerArray}, { value: 'career', weight: 3 }, { value: 'managers', weight: 1 }]
// const teamOrPlayerArray = [{ value: 'team', weight: 4, nextChoice: [team, player]}, { value: 'player', weight: 4, nextChoice: [team, player]}]
// const playerCategories = [{ value: 'singleSeason', weight: 4, nextChoice: 4}]
// const teamCategories =
// const stat = [{ value: 'homerun', weight: 4}]


//this helper function is used to pick a random value from an array based on weight prop of object
//will be moved to a different file
const randomValueSelector = (arr) => {
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

//this class will use the QuestionChoices object to build the question object
export class Question {
  constructor() {
    this.questionText = ''
    this.correctAnswer = ''
    this.answerChoices = []
  }

}

//class to create an object with a list of question pieces
export class QuestionChoices {
  constructor() {
    this.questionSelectorArray = []
  }

  questionChoiceGenerator(optionsArray){
    const chosenOption = randomValueSelector(optionsArray)
    chosenOption.whatToSet.forEach((curr) => {
      //set property on questionChoices object
      this[curr.key] = curr.value
      //push to question selector array to later decide on question text
      if (curr.neededToSelectQuestion) {
        this.questionSelectorArray.push(curr.key)
      }
    })
    //recursively run generator on next array of choices, if there is one
    if (chosenOption.nextChoice) {
      this.questionChoiceGenerator(chosenOption.nextChoice)
    }
  }
}

// QUESTION OPTION ARRAYS

const mostOrLeast = [
  {whatToSet: [{key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'mostOrLeast', value: 'least', neededToSelectQuestion: true}], weight: 1}
]

const overallBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HOMERUNS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 8},
  {whatToSet: [{key: 'statCategory', value: 'BASEHITS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'TRIPLES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'XTRABASEHITS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'RBI', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 5},
  {whatToSet: [{key: 'statCategory', value: 'ATBATS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'WALKS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RUNS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'TOTALBASES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'STOLENBASES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'STRIKINGOUT', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HITBYPITCH', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'INTENTIONALWALKS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLEPLAYS', neededToSelectQuestion: true}], weight: 1, nextChoice: mostOrLeast},
]

const comparisonBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HOMERUNS', neededToSelectQuestion: true}], weight: 8, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'BASEHITS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLES', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'TRIPLES', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'XTRABASEHITS', neededToSelectQuestion: true}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RBI', neededToSelectQuestion: true}], weight: 5, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'ATBATS', neededToSelectQuestion: true}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'WALKS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RUNS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'TOTALBASES', neededToSelectQuestion: true}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'STOLENBASES', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'STRIKINGOUT', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HITBYPITCH', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'INTENTIONALWALKS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLEPLAYS', neededToSelectQuestion: true}], weight: 1, nextChoice: mostOrLeast},
]

const questionType = [
  {whatToSet: [{key: 'questionType', value: 'comparison', neededToSelectQuestion: true}], weight: 1, nextChoice: comparisonBattingStats},
  {whatToSet: [{key: 'questionType', value: 'overall', neededToSelectQuestion: true}], weight: 1, nextChoice: overallBattingStats}
]

const teamTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', neededToSelectQuestion: true}], weight: 2, nextChoice: questionType},
  {whatToSet: [{key: 'timeFrame', value: 'franchiseHistory', neededToSelectQuestion: true}], weight: 1, nextChoice: questionType}
]

const playerTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', neededToSelectQuestion: true}], weight: 3, nextChoice: questionType},
  {whatToSet: [{key: 'timeFrame', value: 'wholeCareer', neededToSelectQuestion: true}], weight: 1, nextChoice: questionType}
]

const teamOrPlayer = [
  {whatToSet: [{key: 'teamOrPlayer', value: 'singlePlayer', neededToSelectQuestion: true}], weight: 4, nextChoice: playerTimeFrame},
  {whatToSet: [{key: 'teamOrPlayer', value: 'wholeTeam', neededToSelectQuestion: true}], weight: 2, nextChoice: teamTimeFrame}
]

// // QUESTION OPTION OBJECTS
// const quantifier = {
//   choices: [
//     {option1: 'most', weight: 1},
//     {option2: 'least', weight: 1}
//   ]
// }

// const statCategory = {
//   choices: [
//     {option: 'HOMERUNS', weight: 8}, {option2: 'BASEHITS', weight: 3},
//     {option: 'DOUBLES', weight: 3},
//     {option: 'TRIPLES', weight: 3}, {option1: 'XTRABASEHITS', weight: 2},
//     {option: 'RBI', weight: 5},
//     {option: 'ATBATS', weight: 2}, {option1: 'WALKS', weight: 3},
//     {option: 'RUNS', weight: 3},
//     {option: 'TOTALBASES', weight: 2},
//     {option: 'STOLENBASES', weight: 3},
//     {option: 'STRIKINGOUT', weight: 2},
//     {option: 'HITBYPITCH', weight: 1},
//     {option: 'INTENTIONALWALKS', weight: 1}, {option1: 'DOUBLEPLAYS', weight: 3}
//   ],
//   nextChoice: quantifier
// }

// const whoQuestionIsAbout = {
//   choices: [
//     {option1: 'wholeTeam', weight: 1},
//     {option2: 'singlePlayer', weight: 1}
//   ],
//   nextChoice: statCategory
// }

// const timeSpan = {
//   choices: [
//     {option1: 'singleSeason', weight: 1},
//     {option2: 'wholeCareer', weight: 1}
//   ],
//   nextChoice: whoQuestionIsAbout
// }


//placeholder functions to be called by questionChoiceGenerator, will be moved to own file.
// const seasonOrCareerArray = () => {
//   const seasonCareerArray = [{ chooser: 'seasonOrCareer', value: 'singleSeason', weight: 4, nextChoice: teamPlayerArray, phrasing: false}, { chooser: 'seasonOrCareer', value: 'career', weight: 3 }, { chooser: 'seasonOrCareer', value: 'managers', weight: 1 }]
//   const obj = randomValueSelector(seasonOrCareerArray)
//   this.seasonOrCareer = obj.value
//   if (obj.phrasing){
//     this.phrasing.push(obj.value)
//   }
//   if (obj.nextChoice){
//     obj.nextChoice()
//   } else {
//     return obj
//   }
// }

// const teamPlayerArray = () => {
//   const teamOrPlayerArray = [{ value: 'team', weight: 4, nextChoice: [team, player]}, { value: 'player', weight: 4, nextChoice: [team, player]}]
//   const obj = randomValueSelector(seasonOrCareerArray)
//   this.seasonOrCareer = obj.value
//   if(obj.nextChoice){
//     obj.nextChoice()
//   }
// }
