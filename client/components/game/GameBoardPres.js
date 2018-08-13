import React from 'react'
import {Question, QuestionChoices} from '../../../GameplayFunctions/questions/questionGenerator'
import {defaultYearRanges} from '../../../GameplayFunctions/questions/content/questionContent'
import {teamOrPlayer} from '../../../GameplayFunctions/questions/content/questionOptionsContent'
/* eslint-disable react/display-name */
/* eslint-disable react/display-name */
export default () => {
  const selectedQuestionChoices = new QuestionChoices()
  selectedQuestionChoices.questionChoiceGenerator(teamOrPlayer, defaultYearRanges)
  const currentQuestion = new Question(selectedQuestionChoices)
  currentQuestion.questionTextGenerator()
  return (
    <div className="gameboard-pres-container">
      <h1> Playing the Game!!!!! </h1>
      <h1>{currentQuestion.questionText}</h1>
    </div>
  )
}
