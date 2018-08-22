// THIS FILE CONTAINS ALL QUESTION OPTIONS NEEDED BY THE QuestionChoices CONSTRUCTOR

//reminder, order matters. The first choice needs to be at the end of the file. The first choice also needs to be exported.

const mostOrLeast = [
  {whatToSet: [{key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'mostOrLeast', value: 'least', skeletonType: {stat: {mostOrLeast: [`least`]}}}], weight: 1}
]

const overallBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HR', skeletonType: {stat: {verb: [`hit`], objectNoun: [`home runs`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 8},
  {whatToSet: [{key: 'statCategory', value: 'hits', skeletonType: {stat: {verb: [`had`], objectNoun: [`base hits`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: '2B', skeletonType: {stat: {verb: [`hit`], objectNoun: [`doubles`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: '3B', skeletonType: {stat: {verb: [`legged out`], objectNoun: [`triples`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'XBH', skeletonType: {stat: {verb: [`had`], objectNoun: [`extra base hits`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'RBI', skeletonType: {stat: {verb: [`had`], objectNoun: [`RBIs`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 5},
  {whatToSet: [{key: 'statCategory', value: 'AB', skeletonType: {stat: {verb: [`had`], objectNoun: [`at bats`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'BB', skeletonType: {stat: {verb: [`had`], objectNoun: [`walks`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'runs', skeletonType: {stat: {verb: [`scored`], objectNoun: [`runs`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'totalBases', skeletonType: {stat: {verb: [`had`], objectNoun: [`total bases`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'SB', skeletonType: {stat: {verb: [`stole`], objectNoun: [`bases`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'SO', skeletonType: {stat: {verb: [`struck out`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HBP', skeletonType: {stat: {verb: [`was hit by a pitch`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'IBB', skeletonType: {stat: {verb: [`was walked intentionally`] }}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'GIDP', skeletonType: {stat: {verb: [`hit into`], objectNoun: [`double plays`]}}}], weight: 1, nextChoice: mostOrLeast},
]

const comparisonBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HR', skeletonType: {stat: {verb: [`hit`], objectNoun: [`home runs`]}}}], weight: 8, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'hits', skeletonType: {stat: {verb: [`had`], objectNoun: [`base hits`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: '2B', skeletonType: {stat: {verb: [`hit`], objectNoun: [`doubles`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: '3B', skeletonType: {stat: {verb: [`legged out`], objectNoun: [`triples`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'XBH', skeletonType: {stat: {verb: [`had`], objectNoun: [`extra base hits`]}}}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RBI', skeletonType: {stat: {verb: [`had`], objectNoun: [`RBIs`]}}}], weight: 5, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'AB', skeletonType: {stat: {verb: [`had`], objectNoun: [`at bats`]}}}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'BB', skeletonType: {stat: {verb: [`had`], objectNoun: [`walks`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'runs', skeletonType: {stat: {verb: [`scored`], objectNoun: [`runs`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'totalBases', skeletonType: {stat: {verb: [`had`], objectNoun: [`total bases`]}}}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'SB', skeletonType: {stat: {verb: [`stole`], objectNoun: [`bases`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'SO', skeletonType: {stat: {verb: [`struck out`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HBP', skeletonType: {stat: {verb: [`was hit by a pitch`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'IBB', skeletonType: {stat: {verb: [`was walked intentionally`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'GIDP', skeletonType: {stat: {verb: [`hit into`], objectNoun: [`double plays`]}}}], weight: 1, nextChoice: mostOrLeast},
]

const overallTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', skeletonType: {stat: {timeFrame: [` in `]}}}], weight: 2, nextChoice: overallBattingStats},
  {whatToSet: [{key: 'timeFrame', value: 'allTime', skeletonType: {stat: {timeFrame: [` all time`]}}}], weight: 1, nextChoice: overallBattingStats}
]

const comparisonTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', skeletonType: {stat: {timeFrame: [` in `]}}}], weight: 3, nextChoice: comparisonBattingStats},
  {whatToSet: [{key: 'timeFrame', value: 'allTime'}], weight: 1, nextChoice: comparisonBattingStats}
]


const questionType = [
  {whatToSet: [{key: 'questionType', value: 'comparison', skeletonType: {stat: {comparativePhrasing: [`of these`], pluralization: [`s`]}}}], weight: 1, nextChoice: comparisonTimeFrame},
  {whatToSet: [{key: 'questionType', value: 'overall'}], weight: 1, nextChoice: overallTimeFrame}
]


const teamOrPlayer = [
  {whatToSet: [{key: 'teamOrPlayer', value: 'singlePlayer', skeletonType: {stat: {subjectNoun: [`player`]}}}], weight: 4, nextChoice: questionType},
  {whatToSet: [{key: 'teamOrPlayer', value: 'wholeTeam', skeletonType: {stat: {subjectNoun: [`team`]}}}], weight: 2, nextChoice: questionType}
]

module.exports = {teamOrPlayer}
