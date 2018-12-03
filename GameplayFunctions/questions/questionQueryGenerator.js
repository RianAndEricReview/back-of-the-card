//THIS FILE CONTAINS THE CONSTRUCTOR FUNCTION FOR GENERATING DYNAMIC QUERY PARAMETERS
const sequelize = require('sequelize')
const { Franchises, People} = require('../../server/db/models')

//class to create an object with query parameters
class QuestionQueryParameters {
  //To combine stats for players with multiple entries (ex: player was traded, or all time stats):
  // we Group by the playerID and SUM the needed stats in Attributes

  //Method to set the where parameters for the query based on the questionChoices object
  whereGenerator(questionChoices, isDerived){
    const whereClause = {}
    if (questionChoices.questionSkeletonKey.year) { whereClause.year = questionChoices.questionSkeletonKey.year }
    if (!isDerived) { whereClause[questionChoices.statCategory] = { [sequelize.Op.ne]: null } }
    if (whereClause !== {}) { this.where = whereClause }
  }

  attributeGenerator(questionChoices, isDerived){
    const attributes = []
    //Add year attribute if there is a year.
    if (questionChoices.questionSkeletonKey.year) { attributes.push([sequelize.fn('MIN', sequelize.col('year')), 'year'])}
    //Add PA if it is a player stat.
    if (questionChoices.teamOrPlayer === 'singlePlayer') { attributes.push([sequelize.fn('SUM', sequelize.col('PA')), 'PA']) }
    else if (questionChoices.teamOrPlayer === 'wholeTeam' && questionChoices.timeFrame === 'singleSeason') { attributes.push('name') }
    //set attributes for stat based on whether or not derived.
    if (!isDerived) { attributes.push([sequelize.fn('SUM', sequelize.col(questionChoices.statCategory)), questionChoices.statCategory]) }
    else {
      //update name of derived stat
      isDerived.attributes.forEach((attribute) => {
        attributes.push([sequelize.fn('SUM', sequelize.col(attribute)), attribute])
      })
     }
     this.attributes = attributes
  }

  //Method to set the order parameters for the query based on the questionChoices object
  orderGenerator(questionChoices, isDerived){
    if (!isDerived) {this.order = [[sequelize.col(questionChoices.statCategory), questionChoices.mostOrLeast === 'most' ? 'DESC' : 'ASC']]}
  }
  //Method to set the limit parameters for the query based on the questionChoices object
  limitGenerator(questionChoices, isDerived){
    if (questionChoices.teamOrPlayer === 'singlePlayer' && (!isDerived && questionChoices.mostOrLeast === 'most')) {this.limit = 100}
  }
  //Method to set the include parameters for the query based on the questionChoices object
  includeGenerator(questionChoices){
    if (questionChoices.teamOrPlayer === 'singlePlayer') {this.include = [{ model: People, attributes: ['playerID', 'nameFirst', 'nameLast'] }]}
    else if (questionChoices.teamOrPlayer === 'wholeTeam' && questionChoices.timeFrame === 'allTime') {this.include = [{ model: Franchises, attributes: ['franchID', 'name'] }]}
  }
  //Method to set the group parameters for the query based on the questionChoices object
  groupGenerator(questionChoices){
    if (questionChoices.teamOrPlayer === 'singlePlayer') {this.group = ['person.playerID']}
    else if (questionChoices.teamOrPlayer === 'wholeTeam' && questionChoices.timeFrame === 'allTime') {this.group = ['franchise.franchID']}
    else if (questionChoices.teamOrPlayer === 'wholeTeam' && questionChoices.timeFrame === 'singleSeason') {this.group = ['teams.name']}
  }

}

module.exports = {QuestionQueryParameters}
