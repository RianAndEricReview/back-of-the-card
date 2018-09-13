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
  }
  //Method to set the group parameters for the query based on the questionChoices object
  groupGenerator(questionChoices){
    if (questionChoices.teamOrPlayer === 'singlePlayer') {this.group = ['person.playerID']}
  }

}

module.exports = {QuestionQueryParameters}
