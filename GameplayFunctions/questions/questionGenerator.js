const questionTypeArray = [{ value: 'hitting', weight: 4 }, { value: 'pitching', weight: 3 }, { value: 'managers', weight: 1 }]

const randomValueSelector = (arr) => {
  const totalWeight = arr.reduce((accum, currObj) => {
    return accum + currObj.weight
  }, 0)

  let currentNum = 0;
  const targetNum = Math.floor(Math.random() * totalWeight) + 1

  for (let i = 0; i < arr.length; i++) {
    currentNum += arr[i].weight
    if (targetNum <= currentNum) {
      return arr[i].value
    }
  }
}


class Question {
  constructor() {
    this.questionText = ''
    this.correctAnswer = ''
    this.answerChoices = []
  }

  questionGenerator() {
    this.questionType = randomValueSelector(questionTypeArray)
  }
}
