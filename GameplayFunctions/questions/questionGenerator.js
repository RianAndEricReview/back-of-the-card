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
class Question {
  constructor() {
    this.questionText = ''
    this.correctAnswer = ''
    this.answerChoices = []
  }

}

//class to create an object with a list of question pieces
class QuestionChoices {
  constructor() {
    this.phrasing = []
  }

  questionChoiceGenerator(startFunc){
    startFunc()
  }
}


//placeholder functions to be called by questionChoiceGenerator, will be moved to own file.
const seasonOrCareerArray = () => {
  const seasonCareerArray = [{ value: 'singleSeason', weight: 4, nextChoice: teamPlayerArray, phrasing: false}, { value: 'career', weight: 3 }, { value: 'managers', weight: 1 }]
  const obj = randomValueSelector(seasonOrCareerArray)
  this.seasonOrCareer = obj.value
  if (obj.phrasing){
    this.phrasing.push(obj.value)
  }
  if (obj.nextChoice){
    obj.nextChoice()
  }
}

const teamPlayerArray = () => {
  const teamOrPlayerArray = [{ value: 'team', weight: 4, nextChoice: [team, player]}, { value: 'player', weight: 4, nextChoice: [team, player]}]
  const obj = randomValueSelector(seasonOrCareerArray)
  this.seasonOrCareer = obj.value
  if(obj.nextChoice){
    obj.nextChoice()
  }
}