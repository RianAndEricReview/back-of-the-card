const User = require('./user')
const People = require('./people')
const AllstarFull = require('./allstarFull')
const Appearances = require('./appearances')
const AwardsManagers = require('./awardsManagers')
const AwardsPlayers = require('./awardsPlayers')
const AwardsShareManagers = require('./awardsShareManagers')
const AwardsSharePlayers = require('./awardsSharePlayers')
const Batting = require('./batting')
const BattingPost = require('./battingPost')
const CollegePlaying = require('./collegePlaying')
const Fielding = require('./fielding')
const FieldingOF = require('./fieldingOF')
const FieldingOFsplit = require('./fieldingOFsplit')
const FieldingPost = require('./fieldingPost')
const Franchises = require('./franchises')
const HallOfFame = require('./hallOfFame')
const HomeGames = require('./homeGames')
const Managers = require('./managers')
const ManagersHalf = require('./managersHalf')
const Parks = require('./parks')
const Pitching = require('./pitching')
const PitchingPost = require('./pitchingPost')
const Salaries = require('./salaries')
const Schools = require('./schools')
const SeriesPost = require('./seriesPost')
const Teams = require('./teams')
const TeamsHalf = require('./teamsHalf')

// Associations

// AllstarFull
AllstarFull.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AllstarFull)
AllstarFull.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(AllstarFull)

// Appearances
Appearances.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(Appearances)
Appearances.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(Appearances)

// AwardsManagers
AwardsManagers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsManagers)

// AwardsPlayers
AwardsPlayers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsPlayers)

// AwardsShareManagers
AwardsShareManagers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsShareManagers)

// AwardsSharePlayers
AwardsSharePlayers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsSharePlayers)


module.exports = {
  User,
  People,
  AllstarFull,
  Appearances,
  AwardsManagers,
  AwardsPlayers,
  AwardsShareManagers,
  AwardsSharePlayers,
  Batting,
  BattingPost,
  CollegePlaying,
  Fielding,
  FieldingOF,
  FieldingOFsplit,
  FieldingPost,
  Franchises,
  HallOfFame,
  HomeGames,
  Managers,
  ManagersHalf,
  Parks,
  Pitching,
  PitchingPost,
  Salaries,
  Schools,
  SeriesPost,
  Teams,
  TeamsHalf
}
