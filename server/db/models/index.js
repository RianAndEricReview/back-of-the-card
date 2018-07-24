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
const Game = require('./game')
const Gametype = require('./gametype')
const Question = require('./question')
const GamePlayer = require('./gamePlayer')
// Associations

// AllstarFull
AllstarFull.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(AllstarFull, {foreignKey: 'playerID'})
AllstarFull.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(AllstarFull, {foreignKey: 'teamID'})

// Appearances
Appearances.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Appearances, {foreignKey: 'playerID'})
Appearances.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Appearances, {foreignKey: 'teamID'})

// AwardsManagers
AwardsManagers.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(AwardsManagers, {foreignKey: 'playerID'})

// AwardsPlayers
AwardsPlayers.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(AwardsPlayers, {foreignKey: 'playerID'})

// AwardsShareManagers
AwardsShareManagers.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(AwardsShareManagers, {foreignKey: 'playerID'})

// AwardsSharePlayers
AwardsSharePlayers.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(AwardsSharePlayers, {foreignKey: 'playerID'})

// Batting
Batting.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Batting, {foreignKey: 'playerID'})
Batting.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Batting, {foreignKey: 'teamID'})

// BattingPost
BattingPost.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(BattingPost, {foreignKey: 'playerID'})
BattingPost.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(BattingPost, {foreignKey: 'teamID'})

// CollegePlaying
CollegePlaying.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(CollegePlaying, {foreignKey: 'playerID'})
CollegePlaying.belongsTo(Schools, {foreignKey: 'schoolID'})
Schools.hasMany(CollegePlaying, {foreignKey: 'schoolID'})

// Fielding
Fielding.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Fielding, {foreignKey: 'playerID'})
Fielding.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Fielding, {foreignKey: 'teamID'})

// FieldingOF
FieldingOF.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(FieldingOF, {foreignKey: 'playerID'})

// FieldingOFsplit
FieldingOFsplit.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(FieldingOFsplit, {foreignKey: 'playerID'})
FieldingOFsplit.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(FieldingOFsplit, {foreignKey: 'teamID'})

// FieldingPost
FieldingPost.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(FieldingPost, {foreignKey: 'playerID'})
FieldingPost.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(FieldingPost, {foreignKey: 'teamID'})

// Franchises
Teams.belongsTo(Franchises, {foreignKey: 'franchID'})
Franchises.hasMany(Teams, {foreignKey: 'franchID'})

// HallOfFame
HallOfFame.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(HallOfFame, {foreignKey: 'playerID'})

//HomeGames
HomeGames.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(HomeGames, {foreignKey: 'teamID'})
HomeGames.belongsTo(Parks, {foreignKey: 'parkID'})
Parks.hasMany(HomeGames, {foreignKey: 'parkID'})

//Managers
Managers.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Managers, {foreignKey: 'playerID'})
Managers.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Managers, {foreignKey: 'teamID'})

//ManagersHalf
ManagersHalf.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(ManagersHalf, {foreignKey: 'playerID'})
ManagersHalf.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(ManagersHalf, {foreignKey: 'teamID'})

//Pitching
Pitching.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Pitching, {foreignKey: 'playerID'})
Pitching.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Pitching, {foreignKey: 'teamID'})

//PitchingPost
PitchingPost.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(PitchingPost, {foreignKey: 'playerID'})
PitchingPost.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(PitchingPost, {foreignKey: 'teamID'})

//Salaries
Salaries.belongsTo(People, {foreignKey: 'playerID'})
People.hasMany(Salaries, {foreignKey: 'playerID'})
Salaries.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(Salaries, {foreignKey: 'teamID'})

//SeriesPost
SeriesPost.belongsTo(Teams, {foreignKey: 'teamIDWinner'})
Teams.hasMany(SeriesPost, {foreignKey: 'teamIDWinner'})
SeriesPost.belongsTo(Teams, {foreignKey: 'teamIDLoser'})
Teams.hasMany(SeriesPost, {foreignKey: 'teamIDLoser'})

//TeamsHalf
TeamsHalf.belongsTo(Teams, {foreignKey: 'teamID'})
Teams.hasMany(TeamsHalf, {foreignKey: 'teamID'})

//Game to Gametype
Game.belongsTo(Gametype)
Gametype.hasMany(Game)

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
  TeamsHalf,
  Game,
  Gametype,
  Question,
  GamePlayer
}
