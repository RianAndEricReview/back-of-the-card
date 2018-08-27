const randomYearSelector = require('./questionHelperFuncs').randomYearSelector
const randomValueSelector = require('./questionHelperFuncs').randomValueSelector

//THIS FILE CONTAINS ALL QUESTION GENERATING CONSTRUCTOR FUNCTIONS

//class to create an object with a list of question pieces
class QuestionChoices {
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
      let selectedYear = randomYearSelector(yearRange)
      while (selectedYear === 1972 || selectedYear === 1981 || selectedYear === 1994 ){
        selectedYear = randomYearSelector(yearRange)
      }
      this.questionSkeletonKey.year = selectedYear
    }
  }
}

module.exports = {QuestionChoices}
