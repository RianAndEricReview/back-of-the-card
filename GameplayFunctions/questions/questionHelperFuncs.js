//THIS FILE CONTAINS ALL HELPER FUNCTIONS NEEDED TO CREATE QUESTIONS.

//this helper function is used to pick a random value from an array based on weight prop of object
export const randomValueSelector = (arr) => {
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