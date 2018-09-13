//THIS FILE CONTAINS THE CONSTRUCTOR FUNCTION FOR GENERATING DYNAMIC QUERY PARAMETERS
const sequelize = require('sequelize')
const { Batting, People} = require('../../server/db/models')

//class to create an object with query parameters
class QuestionQueryParameters {

  //Method to set the where parameters for the query based on the questionChoices object
  whereGenerator(questionChoices, isDerived){
    const whereClause = {}
    if (questionChoices.questionSkeletonKey.year) { whereClause.year = questionChoices.questionSkeletonKey.year }
    if (!isDerived) { whereClause[questionChoices.statCategory] = { [sequelize.Op.ne]: null } }
    if (whereClause !== {}) { this.where = whereClause }
  }

  includeGenerator(questionChoices){
    if (questionChoices.teamOrPlayer === 'singlePlayer') {this.include = [{ model: People, attributes: ['playerID', 'nameFirst', 'nameLast'] }]}
  }

}

module.exports = {QuestionQueryParameters}
