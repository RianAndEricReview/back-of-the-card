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
    this.questionSkeletonKey = {}
  }

  questionChoiceGenerator(optionsArray){
    const chosenOption = randomValueSelector(optionsArray)
    chosenOption.whatToSet.forEach((curr) => {
      //set property on questionChoices object
      this[curr.key] = curr.value
      //push to question selector array to later decide on question text
      if (curr.skeletonType) {
        for (let type in curr.skeletonType) {
          if (curr.skeletonType.hasOwnProperty(type)) {
            for (let piece in curr.skeletonType[type]) {
              if (curr.skeletonType[type].hasOwnProperty(piece)) {
                this.questionSkeletonKey[piece] = curr.skeletonType[type][piece]
              }
            }
          }
        }
      }
    })
    //recursively run generator on next array of choices, if there is one
    if (chosenOption.nextChoice) {
      this.questionChoiceGenerator(chosenOption.nextChoice)
    }
  }
}
