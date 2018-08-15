import React from 'react'
import {QuestionChoices} from '../../../GameplayFunctions/questions/questionGenerator'
import {defaultYearRanges} from '../../../GameplayFunctions/questions/content/questionContent'
import {teamOrPlayer} from '../../../GameplayFunctions/questions/content/questionOptionsContent'
import {questionTextGenerator} from '../../../GameplayFunctions/questions/questionHelperFuncs'
/* eslint-disable react/display-name */
/* eslint-disable react/display-name */
export default () => {
  const selectedQuestionChoices = new QuestionChoices()
  console.log('!!!!!!!!!!!', selectedQuestionChoices)
  selectedQuestionChoices.questionChoiceGenerator(teamOrPlayer, defaultYearRanges)
  const questionText = questionTextGenerator(selectedQuestionChoices)
  return (
    <div className="gameboard-pres-container">
      <h1> Playing the Game!!!!! </h1>
      {<h1>{questionText}</h1>}
    </div>
  )
}
