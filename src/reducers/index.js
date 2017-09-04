import { createStore, combineReducers } from 'redux';

const authReducer = function(state = {}, action) {
  switch(action.type) {
    case "TOKEN":
      return Object.assign({}, state, { token: action.token })
    default:
      break
  }
  return state
}

// The User Reducer
const userReducer = function(state = {}, action) {
  switch(action.type) {
    case "USERS":
      return Object.assign({}, state, { users: action.users })
    case 'RESET_ME':
      return Object.assign({}, state, { me: null, authenticated: false, notFound: false })
    case 'ME':
      return Object.assign({}, state, { me: action.user, authenticated: true, notFound: false })
    case 'USER_NOT_FOUND':
      return Object.assign({}, state, { me: null, authenticated: false, notFound: true })
    default:
      break
  }
  return state
}

const areaReducer = function(state = {}, action) {
  var areas
  switch(action.type) {
    case "AREAS":
      return Object.assign({}, state, { areas: action.areas })
    case "NEW_AREA":
      areas = pushNewEntityToState(action.area, state, "areas")
      return Object.assign({}, state, { newArea: action.area, areas: areas })
    case "UPDATE_AREA":
      areas = mergeEntityAndState(action.area, state, "areas")
      return Object.assign({}, state, { updatedArea: action.area, areas: areas})
    case "DESTROY_AREA":
      var deletedArea = state.areas.filter(area => { return area.id === action.id })[0]
      areas = removeEntityFromState(action.id, state, "areas")
      return Object.assign({}, state, { deletedArea: deletedArea, areas: areas})
    default:
      break
  }
  return state
}

const specialityReducer = function(state = {}, action) {
  var specialities
  switch(action.type) {
    case "SPECIALITIES":
      return Object.assign({}, state, { specialities: action.specialities })
    case "NEW_SPECIALITY":
      specialities = pushNewEntityToState(action.speciality, state, "specialities")
      return Object.assign({}, state, { newSpeciality: action.speciality, specialities: specialities })
    case "UPDATE_SPECIALITY":
      specialities = mergeEntityAndState(action.speciality, state, "specialities")
      return Object.assign({}, state, { updatedSpeciality: action.speciality, specialities: specialities})
    case "DESTROY_SPECIALITY":
      var deletedSpeciality = state.specialities.filter(speciality => { return speciality.id === action.id })[0]
      specialities = removeEntityFromState(action.id, state, "specialities")
      return Object.assign({}, state, { deletedSpeciality: deletedSpeciality, specialities: specialities})
    default:
      break
  }
  return state
}

const schoolReducer = function(state = {}, action) {
  var schools
  switch(action.type) {
    case "SCHOOLS":
      return Object.assign({}, state, { schools: action.schools })
    case "NEW_SCHOOL":
      schools = pushNewEntityToState(action.school, state, "schools")
      return Object.assign({}, state, { newSchool: action.school, schools: schools })
    case "UPDATE_SCHOOL":
      schools = mergeEntityAndState(action.school, state, "schools")
      return Object.assign({}, state, { updatedSchool: action.school, schools: schools})
    case "DESTROY_SCHOOL":
      var deletedSchool = state.schools.filter(school => { return school.id === action.id })[0]
      schools = removeEntityFromState(action.id, state, "schools")
      return Object.assign({}, state, { deletedSchool: deletedSchool, schools: schools})
    default:
      break
  }
  return state
}

const sessionReducer = function(state = {}, action) {
  var sessions
  switch(action.type) {
    case "SESSIONS":
      return Object.assign({}, state, { sessions: action.sessions })
    case "SESSION":
      return Object.assign({}, state, { session: action.session })
    case "NEW_SESSION":
      sessions = pushNewEntityToState(action.session, state, "sessions")
      return Object.assign({}, state, { newSession: action.session, sessions: sessions })
    case "UPDATE_SESSION":
      sessions = mergeEntityAndState(action.session, state, "sessions")
      return Object.assign({}, state, { updatedSession: action.session, sessions: sessions})
    case "DESTROY_SESSION":
      var deletedSession = state.sessions.filter(session => { return session.id === action.id })[0]
      sessions = removeEntityFromState(action.id, state, "sessions")
      return Object.assign({}, state, { deletedSession: deletedSession, sessions: sessions})
    case "SESSION_LAUNCH":
    case "SESSION_PAUSE":
      sessions = mergeEntityAndState(action.session, state, "sessions")
      return Object.assign({}, state, { sessions: sessions })
    case "SESSION_PUSH":
      sessions = mergeEntityAndState(action.session, state, "sessions")
      return Object.assign({}, state, { sessions: sessions, session: action.session })
    default:
      break
  }
  return state
}

const gameReducer = function(state = {}, action) {
  var games
  switch(action.type) {
    case "GAMES":
      return Object.assign({}, state, { games: action.games })
    case "NEW_GAME":
      games = pushNewEntityToState(action.game, state, "games")
      return Object.assign({}, state, { newGame: action.game, games: games })
    case "UPDATE_GAME":
      games = mergeEntityAndState(action.game, state, "games")
      return Object.assign({}, state, { updatedGame: action.game, games: games})
    case "DESTROY_GAME":
      var deletedGame = state.games.filter(game => { return game.id === action.id })[0]
      games = removeEntityFromState(action.id, state, "games")
      return Object.assign({}, state, { deletedGame: deletedGame, games: games})
    case "UPLOAD_FILE":
      games = mergeEntityAndState(action.game, state, "games")
      return Object.assign({}, state, { games: games })
    default:
      break
  }
  return state
}

const objectiveReducer = function(state = {}, action) {
  var objectives
  switch(action.type) {
    case "OBJECTIVES":
      return Object.assign({}, state, { objectives: action.objectives })
    case "NEW_OBJECTIVE":
      objectives = pushNewEntityToState(action.objective, state, "objectives")
      return Object.assign({}, state, { newObjective: action.objective, objectives: objectives })
    case "UPDATE_OBJECTIVE":
      objectives = mergeEntityAndState(action.objective, state, "objectives")
      return Object.assign({}, state, { updatedObjective: action.objective, objectives: objectives})
    case "DESTROY_OBJECTIVE":
      var deletedObjective = state.objectives.filter(objective => { return objective.id === action.id })[0]
      objectives = removeEntityFromState(action.id, state, "objectives")
      return Object.assign({}, state, { deletedObjective: deletedObjective, objectives: objectives})
    default:
      break
  }
  return state
}

const scenarioReducer = function(state = {}, action) {
  var scenarios
  switch(action.type) {
    case "SCENARIOS":
      return Object.assign({}, state, { scenarios: action.scenarios })
    case "NEW_SCENARIO":
      scenarios = pushNewEntityToState(action.scenario, state, "scenarios")
      return Object.assign({}, state, { newScenario: action.scenario, scenarios: scenarios })
    case "UPDATE_SCENARIO":
      scenarios = mergeEntityAndState(action.scenario, state, "scenarios")
      return Object.assign({}, state, { updatedScenario: action.scenario, scenarios: scenarios})
    case "DESTROY_SCENARIO":
      var deletedScenario = state.scenarios.filter(scenario => { return scenario.id === action.id })[0]
      scenarios = removeEntityFromState(action.id, state, "scenarios")
      return Object.assign({}, state, { deletedScenario: deletedScenario, scenarios: scenarios})
    default:
      break
  }
  return state
}

const decisionMakerReducer = function(state = {}, action) {
  var decisionMakers
  switch(action.type) {
    case "DECISIONMAKERS":
      return Object.assign({}, state, { decisionMakers: action.decisionMakers })
    case "NEW_DECISIONMAKER":
      decisionMakers = pushNewEntityToState(action.decisionMaker, state, "decisionMakers")
      return Object.assign({}, state, { newDecisionMaker: action.decisionMaker, decisionMakers: decisionMakers })
    case "UPDATE_DECISIONMAKER":
      decisionMakers = mergeEntityAndState(action.decisionMaker, state, "decisionMakers")
      return Object.assign({}, state, { updatedDecisionMaker: action.decisionMaker, decisionMakers: decisionMakers})
    case "DESTROY_DECISIONMAKER":
      var deletedDecisionMaker = state.decisionMakers.filter(decisionMaker => { return decisionMaker.id === action.id })[0]
      decisionMakers = removeEntityFromState(action.id, state, "decisionMakers")
      console.dir(Object.assign({}, state, { deletedDecisionMaker: deletedDecisionMaker, decisionMakers: decisionMakers}))
      return Object.assign({}, state, { deletedDecisionMaker: deletedDecisionMaker, decisionMakers: decisionMakers})
    default:
      break
  }
  return state
}


const roomReducer = function(state = {}, action) {
  var rooms
  switch(action.type) {
    case "ROOMS":
      return Object.assign({}, state, { rooms: action.rooms })
    case "NEW_ROOM":
      rooms = pushNewEntityToState(action.room, state, "rooms")
      return Object.assign({}, state, { newScenario: action.room, rooms: rooms })
    case "UPDATE_ROOM":
      rooms = mergeEntityAndState(action.room, state, "rooms")
      return Object.assign({}, state, { updatedScenario: action.room, rooms: rooms})
    case "DESTROY_ROOM":
      var deletedScenario = state.rooms.filter(room => { return room.id === action.id })[0]
      rooms = removeEntityFromState(action.id, state, "rooms")
      return Object.assign({}, state, { deletedScenario: deletedScenario, rooms: rooms})
    default:
      break
  }
  return state
}

const clueReducer = function(state = {}, action) {
  var clues
  switch(action.type) {
    case "CLUES":
      return Object.assign({}, state, { clues: action.clues })
    case "NEW_CLUE":
      clues = pushNewEntityToState(action.clue, state, "clues")
      return Object.assign({}, state, { newClue: action.clue, clues: clues })
    case "UPDATE_CLUE":
      clues = mergeEntityAndState(action.clue, state, "clues")
      return Object.assign({}, state, { updatedClue: action.clue, clues: clues})
    case "DESTROY_CLUE":
      var deletedClue = state.clues.filter(clue => { return clue.id === action.id })[0]
      clues = removeEntityFromState(action.id, state, "clues")
      return Object.assign({}, state, { deletedClue: deletedClue, clues: clues})
    default:
      break
  }
  return state
}

function pushNewEntityToState(entity, state, name) {
  var list = state[name]
  if (entity !== undefined) {
    list = JSON.parse(JSON.stringify(list))
    list.push(entity)
  }
  return list
}

function removeEntityFromState(id, state, name) {
  var list = state[name], newList = []
  if (list && id !== undefined) {
    for(var index in list) {
      if (list[index].id.toString() !== id.toString()) {
        newList.push(list[index])
      }
    }
  } else {
    newList = list
  }
  return newList
}

function mergeEntityAndState(entity, state, name) {
  var list = state[name], newList = []
  if (list && entity !== undefined) {
    for(var index in list) {
      if (list[index].id === entity.id) {
        newList.push(entity)
      } else {
        newList.push(list[index])
      }
    }
  } else {
    newList = list
  }
  return newList
}

// Combine Reducers
const reducers = combineReducers({
  authState: authReducer,
  userState: userReducer,

  areaState: areaReducer,
  specialityState: specialityReducer,
  schoolState: schoolReducer,
  sessionState: sessionReducer,
  gameState: gameReducer,
  objectiveState: objectiveReducer,
  scenarioState: scenarioReducer,
  roomState: roomReducer,
  clueState: clueReducer,
  decisionMakerState: decisionMakerReducer,

});

const store = createStore(reducers);

export default store
