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
    this.questionFinderArray = []
  }

  questionChoiceGenerator(optionsArray, optionKey){
    const chosenOption = randomValueSelector(optionsArray)
    this[optionKey] = chosenOption.option
    if (chosenOption.neededToFindQuestion) {
      this.questionFinderArray.push(chosenOption.option)
    }
    if (chosenOption.nextChoice) {
      const keyOfNextChoiceArray = chosenOption.nextChoice.nextKey
      this.questionChoiceGenerator(chosenOption.nextChoice[keyOfNextChoiceArray], chosenOption.nextChoice.nextKey)
    }
    // else {
    //   return chosenOption
    // }
    // Thinking this is not necessary for the recursion to end. The base case happens when there is no nextChoice, at which time there will be no more calls to the questionChoiceGenerator and the new QuestionChoices object will have been built out with all necessary fields added.
  }
}

// QUESTION OPTION ARRAYS

const quantifier = [
  {option: 'most', weight: 4, neededToFindQuestion: true},
  {option: 'least', weight: 1, neededToFindQuestion: true}
]

const statCategory = [
  {option: 'HOMERUNS', weight: 8, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'BASEHITS', weight: 3, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'DOUBLES', weight: 3, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'TRIPLES', weight: 3, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'XTRABASEHITS', weight: 2, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'RBI', weight: 5, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'ATBATS', weight: 2, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'WALKS', weight: 3, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'RUNS', weight: 3, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'TOTALBASES', weight: 2, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'STOLENBASES', weight: 3, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'STRIKINGOUT', weight: 2, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'HITBYPITCH', weight: 1, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true},
  {option: 'INTENTIONALWALKS', weight: 1, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true}, {option: 'DOUBLEPLAYS', weight: 1, nextChoice: {quantifier, nextKey: 'quantifier'}, neededToFindQuestion: true}
]

const teamOrPlayer = [
  {option: 'wholeTeam', weight: 1, nextChoice: {statCategory, nextKey: 'statCategory'}, neededToFindQuestion: true},
  {option: 'singlePlayer', weight: 3, nextChoice: {statCategory, nextKey: 'statCategory'}, neededToFindQuestion: true}
]

const seasonOrCareer = [
  {option: 'singleSeason', weight: 1, nextChoice: {teamOrPlayer, nextKey: 'teamOrPlayer'}, neededToFindQuestion: true},
  {option: 'wholeCareer', weight: 1, nextChoice: {teamOrPlayer, nextKey: 'teamOrPlayer'}, neededToFindQuestion: true}
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
