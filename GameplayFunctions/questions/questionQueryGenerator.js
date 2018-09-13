//THIS FILE CONTAINS THE CONSTRUCTOR FUNCTION FOR GENERATING DYNAMIC QUERY PARAMETERS

//class to create an object with query parameters
class QuestionQueryParameters {
  constructor() {
    this.attributes = []
  }


  //Set the where parameters for the query based on the questionChoices object

  whereGenerator(questionChoices, isDerived, sequelize){
    const whereClause = {}
    if (questionChoices.questionSkeletonKey.year) { whereClause.year = questionChoices.questionSkeletonKey.year }
    if (!isDerived) { whereClause[questionChoices.statCategory] = { [sequelize.Op.ne]: null } }
    if (whereClause !== {}) { this.where = whereClause }
  }

}

module.exports = {QuestionQueryParameters}
