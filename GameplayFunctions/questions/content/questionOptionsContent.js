// THIS FILE CONTAINS ALL QUESTION OPTIONS NEEDED BY THE QuestionChoices CONSTRUCTOR

//reminder, order matters. The first choice needs to be at the end of the file. The first choice also needs to be exported.

const mostOrLeast = [
  {whatToSet: [{key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'mostOrLeast', value: 'least', skeletonType: {stat: {mostOrLeast: [`least`]}}}], weight: 1}
]

const overallBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HOMERUNS', skeletonType: {stat: {verb: [`hit`], objectNoun: [`home runs`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 8},
  {whatToSet: [{key: 'statCategory', value: 'BASEHITS', skeletonType: {stat: {verb: [`had`], objectNoun: [`base hits`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLES', skeletonType: {stat: {verb: [`hit`], objectNoun: [`doubles`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'TRIPLES', skeletonType: {stat: {verb: [`legged out`], objectNoun: [`triples`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'XTRABASEHITS', skeletonType: {stat: {verb: [`had`], objectNoun: [`extra base hits`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'RBI', skeletonType: {stat: {verb: [`had`], objectNoun: [`RBIs`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 5},
  {whatToSet: [{key: 'statCategory', value: 'ATBATS', skeletonType: {stat: {verb: [`had`], objectNoun: [`at bats`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'WALKS', skeletonType: {stat: {verb: [`had`], objectNoun: [`walks`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RUNS', skeletonType: {stat: {verb: [`scored`], objectNoun: [`runs`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'TOTALBASES', skeletonType: {stat: {verb: [`had`], objectNoun: [`total bases`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 2},
  {whatToSet: [{key: 'statCategory', value: 'STOLENBASES', skeletonType: {stat: {verb: [`stole`], objectNoun: [`bases`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 3},
  {whatToSet: [{key: 'statCategory', value: 'STRIKINGOUT', skeletonType: {stat: {verb: [`struck out`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HITBYPITCH', skeletonType: {stat: {verb: [`was hit by a pitch`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'INTENTIONALWALKS', skeletonType: {stat: {verb: [`was walked intentionally`] }}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLEPLAYS', skeletonType: {stat: {verb: [`hit into`], objectNoun: [`double plays`]}}}], weight: 1, nextChoice: mostOrLeast},
]

const comparisonBattingStats = [
  {whatToSet: [{key: 'statCategory', value: 'HOMERUNS', skeletonType: {stat: {verb: [`hit`], objectNoun: [`home runs`]}}}], weight: 8, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'BASEHITS', skeletonType: {stat: {verb: [`had`], objectNoun: [`base hits`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLES', skeletonType: {stat: {verb: [`hit`], objectNoun: [`doubles`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'TRIPLES', skeletonType: {stat: {verb: [`legged out`], objectNoun: [`triples`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'XTRABASEHITS', skeletonType: {stat: {verb: [`had`], objectNoun: [`extra base hits`]}}}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RBI', skeletonType: {stat: {verb: [`had`], objectNoun: [`RBIs`]}}}], weight: 5, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'ATBATS', skeletonType: {stat: {verb: [`had`], objectNoun: [`at bats`]}}}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'WALKS', skeletonType: {stat: {verb: [`had`], objectNoun: [`walks`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'RUNS', skeletonType: {stat: {verb: [`scored`], objectNoun: [`runs`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'TOTALBASES', skeletonType: {stat: {verb: [`had`], objectNoun: [`total bases`]}}}], weight: 2, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'STOLENBASES', skeletonType: {stat: {verb: [`stole`], objectNoun: [`bases`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'STRIKINGOUT', skeletonType: {stat: {verb: [`struck out`]}}}], weight: 3, nextChoice: mostOrLeast},
  {whatToSet: [{key: 'statCategory', value: 'HITBYPITCH', skeletonType: {stat: {verb: [`was hit by a pitch`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'INTENTIONALWALKS', skeletonType: {stat: {verb: [`was walked intentionally`]}}}, {key: 'mostOrLeast', value: 'most', skeletonType: {stat: {mostOrLeast: [`most`]}}}], weight: 1},
  {whatToSet: [{key: 'statCategory', value: 'DOUBLEPLAYS', skeletonType: {stat: {verb: [`hit into`], objectNoun: [`double plays`]}}}], weight: 1, nextChoice: mostOrLeast},
]

const overallTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', skeletonType: {stat: {timeFrame: [`in ${this.questionChoices.year}`]}}}], weight: 2, nextChoice: overallBattingStats},
  {whatToSet: [{key: 'timeFrame', value: 'allTime', skeletonType: {stat: {timeFrame: [`all time`]}}}], weight: 1, nextChoice: overallBattingStats}
]

const comparisonTimeFrame = [
  {whatToSet: [{key: 'timeFrame', value: 'singleSeason', skeletonType: {stat: {timeFrame: [`in ${this.questionChoices.year}`]}}}], weight: 3, nextChoice: comparisonBattingStats},
  {whatToSet: [{key: 'timeFrame', value: 'allTime'}], weight: 1, nextChoice: comparisonBattingStats}
]


const questionType = [
  {whatToSet: [{key: 'questionType', value: 'comparison', skeletonType: {stat: {comparativePhrasing: [`of these`], pluralization: [`s`]}}}], weight: 1, nextChoice: comparisonTimeFrame},
  {whatToSet: [{key: 'questionType', value: 'overall'}], weight: 1, nextChoice: overallTimeFrame}
]


export const teamOrPlayer = [
  {whatToSet: [{key: 'teamOrPlayer', value: 'singlePlayer', skeletonName: 'statQuestionSkeleton', skeletonType: {stat: {subjectNoun: [`player`]}}}], weight: 4, nextChoice: questionType},
  {whatToSet: [{key: 'teamOrPlayer', value: 'wholeTeam', skeletonName: 'statQuestionSkeleton', skeletonType: {stat: {subjectNoun: [`team`]}}}], weight: 2, nextChoice: questionType}
]
