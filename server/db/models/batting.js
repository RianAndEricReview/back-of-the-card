const Sequelize = require('sequelize')
const minPAPerYear = require('../../../GameplayFunctions/questions/content/questionContent').minPAPerYear
const db = require('../db')

const Batting = db.define('batting', {
  playerID: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  stint: {
    type: Sequelize.INTEGER
  },
  teamName: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING
  },
  league: {
    type: Sequelize.STRING
  },
  games: {
    type: Sequelize.INTEGER
  },
  AB: {
    type: Sequelize.INTEGER
  },
  runs: {
    type: Sequelize.INTEGER
  },
  hits: {
    type: Sequelize.INTEGER
  },
  '2B': {
    type: Sequelize.INTEGER
  },
  '3B': {
    type: Sequelize.INTEGER
  },
  HR: {
    type: Sequelize.INTEGER
  },
  RBI: {
    type: Sequelize.INTEGER
  },
  SB: {
    type: Sequelize.INTEGER
  },
  CS: {
    type: Sequelize.INTEGER
  },
  BB: {
    type: Sequelize.INTEGER
  },
  SO: {
    type: Sequelize.INTEGER
  },
  IBB: {
    type: Sequelize.INTEGER
  },
  HBP: {
    type: Sequelize.INTEGER
  },
  SH: {
    type: Sequelize.INTEGER
  },
  SF: {
    type: Sequelize.INTEGER
  },
  GIDP: {
    type: Sequelize.INTEGER
  },
  PA: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.fn('NOW')
  }
}, {
    timestamps: true,
    getterMethods: {
      //used for single season overall questions ONLY
      adjBA() {
        let minPA = 502
        // Used to set the required minimum plate appearances based on the year
        for (let i = 0; i < minPAPerYear.length; i++) {
          if (this.getDataValue('year') >= minPAPerYear[i].start && this.getDataValue('year') <= minPAPerYear[i].end) {
            minPA = minPAPerYear[i].minPA
            break
          }
        }
        // check a player's plate appearances and adjust to account for appearances a player was short of the minimum
        if (this.getDataValue('PA') < minPA) {
          return Math.round(this.getDataValue('hits') / (this.getDataValue('AB') + (minPA - this.getDataValue('PA'))) * 1000) / 1000
        } else {
          return Math.round(this.getDataValue('hits') / this.getDataValue('AB') * 1000) / 1000
        }
      },
      BA() {
        return Math.round(this.getDataValue('hits') / this.getDataValue('AB') * 1000) / 1000
      }
    }
  })

module.exports = Batting
