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
Appearances.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Appearances)
Appearances.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Appearances)

// AwardsManagers
AwardsManagers.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(AwardsManagers, {foreignKey: 'playerID'})

// AwardsPlayers
AwardsPlayers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsPlayers)

// AwardsShareManagers
AwardsShareManagers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsShareManagers)

// AwardsSharePlayers
AwardsSharePlayers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(AwardsSharePlayers)

// Batting
Batting.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(Batting)
Batting.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(Batting)

// BattingPost
BattingPost.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(BattingPost)
BattingPost.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(BattingPost)

// CollegePlaying
CollegePlaying.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(CollegePlaying)
CollegePlaying.belongsTo(Schools, {as: 'team', foreignKey: 'teamID'})
Schools.hasMany(CollegePlaying)

// Fielding
Fielding.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(Fielding)
Fielding.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(Fielding)

// FieldingOF
FieldingOF.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(FieldingOF)

// FieldingOFsplit
FieldingOFsplit.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(FieldingOFsplit)
FieldingOFsplit.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(FieldingOFsplit)

// FieldingPost
FieldingPost.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(FieldingPost)
FieldingPost.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(FieldingPost)

// Franchises
Teams.belongsTo(Franchises, {as: 'franchise', foreignKey: 'franchID'})
Franchises.hasMany(Teams)

// HallOfFame
HallOfFame.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(HallOfFame)

//HomeGames
HomeGames.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(HomeGames)
HomeGames.belongsTo(Parks, {as: 'park', foreignKey: 'parkID'})
Parks.hasMany(HomeGames)

//Managers
Managers.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(Managers)
Managers.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(Managers)

//ManagersHalf
ManagersHalf.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(ManagersHalf)
ManagersHalf.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(ManagersHalf)

//Pitching
Pitching.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(Pitching)
Pitching.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(Pitching)

//PitchingPost
PitchingPost.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(PitchingPost)
PitchingPost.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(PitchingPost)

//Salaries
Salaries.belongsTo(People, {as: 'player', foreignKey: 'playerID'})
People.hasMany(Salaries)
Salaries.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(Salaries)

//SeriesPost
SeriesPost.belongsTo(Teams, {as: 'winningTeam', foreignKey: 'teamIDWinner'})
Teams.hasMany(SeriesPost)
SeriesPost.belongsTo(Teams, {as: 'losingTeam', foreignKey: 'teamIDLoser'})
Teams.hasMany(SeriesPost)

//TeamsHalf
TeamsHalf.belongsTo(Teams, {as: 'team', foreignKey: 'teamID'})
Teams.hasMany(TeamsHalf)

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
