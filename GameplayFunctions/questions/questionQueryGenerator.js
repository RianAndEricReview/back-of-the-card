//THIS FILE CONTAINS THE CONSTRUCTOR FUNCTION FOR GENERATING DYNAMIC QUERY PARAMETERS
const sequelize = require('sequelize')
const { Franchises, People} = require('../../server/db/models')

//class to create an object with query parameters
class QuestionQueryParameters {

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
    //set attributes for stat based on whether or not derived.
    if (!isDerived) { attributes.push([sequelize.fn('SUM', sequelize.col(questionChoices.statCategory)), questionChoices.statCategory]) }
    else {
      //update name of derived stat
      questionChoices.statCategory = `${questionChoices.statCategory}${questionChoices.timeFrame}`
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
    else if (questionChoices.teamOrPlayer === 'wholeTeam') {this.include = [{ model: Franchises, attributes: ['franchID', 'name'] }]}
  }
  //Method to set the group parameters for the query based on the questionChoices object
  groupGenerator(questionChoices){
    if (questionChoices.teamOrPlayer === 'singlePlayer') {this.group = ['person.playerID']}
    else if (questionChoices.teamOrPlayer === 'wholeTeam') {this.group = ['franchise.franchID']}
  }

}

module.exports = {QuestionQueryParameters}
