// THIS FILE CONTAINS ALL QUESTION OPTIONS NEEDED BY THE QuestionChoices CONSTRUCTOR

//reminder, order matters. The first choice needs to be at the end of the file. The first choice also needs to be exported.

const mostOrLeast = [
  {whatToSet: [{key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'mostOrLeast', value: 'least', neededToSelectQuestion: true}], weight: 1}
]

const overallBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HOMERUNS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 8},
  {whatToSet: [{key: 'statCategory', value: 'BASEHITS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'TRIPLES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'XTRABASEHITS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'RBI', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 5},
  {whatToSet: [{key: 'statCategory', value: 'ATBATS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'WALKS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RUNS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'TOTALBASES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'STOLENBASES', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'STRIKINGOUT', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HITBYPITCH', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'INTENTIONALWALKS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLEPLAYS', neededToSelectQuestion: true}], weight: 1, nextChoice: mostOrLeast},
]

const comparisonBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HOMERUNS', neededToSelectQuestion: true}], weight: 8, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'BASEHITS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLES', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'TRIPLES', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'XTRABASEHITS', neededToSelectQuestion: true}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RBI', neededToSelectQuestion: true}], weight: 5, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'ATBATS', neededToSelectQuestion: true}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'WALKS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RUNS', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'TOTALBASES', neededToSelectQuestion: true}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'STOLENBASES', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'STRIKINGOUT', neededToSelectQuestion: true}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HITBYPITCH', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'INTENTIONALWALKS', neededToSelectQuestion: true}, {key: 'mostOrLeast', value: 'most', neededToSelectQuestion: true}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLEPLAYS', neededToSelectQuestion: true}], weight: 1, nextChoice: mostOrLeast},
]

const questionType = [
  {whatToSet: [{key: 'questionType', value: 'comparison', neededToSelectQuestion: true}], weight: 1, nextChoice: comparisonBattingStats},
  {whatToSet: [{key: 'questionType', value: 'overall', neededToSelectQuestion: true}], weight: 1, nextChoice: overallBattingStats}
]

const teamTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', neededToSelectQuestion: true}], weight: 2, nextChoice: questionType},
  {whatToSet: [{key: 'timeFrame', value: 'franchiseHistory', neededToSelectQuestion: true}], weight: 1, nextChoice: questionType}
]

const playerTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', neededToSelectQuestion: true}], weight: 3, nextChoice: questionType},
  {whatToSet: [{key: 'timeFrame', value: 'wholeCareer', neededToSelectQuestion: true}], weight: 1, nextChoice: questionType}
]

export const teamOrPlayer = [
  {whatToSet: [{key: 'teamOrPlayer', value: 'singlePlayer', skeletonType: {stat: {subjectNoun: ['player']}}}], weight: 4, nextChoice: playerTimeFrame},
  {whatToSet: [{key: 'teamOrPlayer', value: 'wholeTeam', skeletonType: {stat: {subjectNoun: ['team']}}}], weight: 2, nextChoice: teamTimeFrame}
]
