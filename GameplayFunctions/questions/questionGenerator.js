import {randomValueSelector} from './questionHelperFuncs'

//THIS FILE CONTAINS ALL QUESTION GENERATING CONSTRUCTOR FUNCTIONS

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
