import {randomValueSelector, randomYearSelector} from './questionHelperFuncs'
import {questionSkeletons} from './content/questionContent'

//THIS FILE CONTAINS ALL QUESTION GENERATING CONSTRUCTOR FUNCTIONS

//this class will use the QuestionChoices object to build the question object
export class Question {
  constructor(questionChoicesObj) {
    this.questionText = ''
    this.correctAnswer = ''
    this.answerChoices = []
    this.questionChoices = questionChoicesObj
  }

  questionTextGenerator(){
    if (this.questionChoices.timeFrame === 'allTime'){
      this.questionChoices.questionSkeletonKey.verb = this.questionChoices.questionSkeletonKey.verb.map(textOption => {
        return (textOption === 'had') ? 'has' : textOption
      })
    }
    //the skeleton name is currently hard coded to be 'statQuestionSkeleton' 
    //later when we have updated the content in the options objects this should set from the questionSkeletonName off questionChoices
    //questionSkeletons[this.questionChoices.questionSkeletonName](this.questionChoices.questionSkeletonKey)
    this.questionText = questionSkeletons.statQuestionSkeleton(this.questionChoices.questionSkeletonKey)
  }
}

//class to create an object with a list of question pieces
export class QuestionChoices {
  constructor() {
    this.questionSkeletonKey = {}
  }

  questionChoiceGenerator(optionsArray, yearRange){
    const chosenOption = randomValueSelector(optionsArray)
    chosenOption.whatToSet.forEach((curr) => {
      //set questionChoice properties
      this[curr.key] = curr.value
      //set questionSkeleton name on questionChoices object
      if (curr.questionSkeletonName){
        this.questionSkeletonName = curr.questionSkeletonName
      }
      //set questionSkeletonKey object on questionChoices object
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
      this.questionChoiceGenerator(chosenOption.nextChoice, yearRange)
    }
    //set the year, if it needs one
    if (this.timeFrame === 'singleSeason'){
      this.questionSkeletonKey.year = randomYearSelector(yearRange)
    }
  }
}
