import { createStore, combineReducers } from 'redux';

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
  switch(action.type) {
    case "AREAS":
      return Object.assign({}, state, { areas: action.areas })
    default:
      break
  }
  return state
}

const specialityReducer = function(state = {}, action) {
  switch(action.type) {
    case "SPECIALITIES":
      return Object.assign({}, state, { specialities: action.specialities })
    default:
      break
  }
  return state
}

const schoolReducer = function(state = {}, action) {
  switch(action.type) {
    case "SCHOOLS":
      return Object.assign({}, state, { schools: action.schools })
    default:
      break
  }
  return state
}

const sessionReducer = function(state = {}, action) {
  switch(action.type) {
    case "SESSIONS":
      return Object.assign({}, state, { sessions: action.sessions })
    case "SESSION":
      return Object.assign({}, state, { session: action.session })
    case "NEW_SESSION":
      var sessions = pushNewEntityToState(action.session, state, "sessions")
      return Object.assign({}, state, { newSession: action.session, sessions: sessions })
    case "UPDATE_SESSION":
      var sessions = mergeEntityAndState(action.session, state, "sessions")
      return Object.assign({}, state, { updatedSession: action.session, sessions: sessions})
    case "DESTROY_SESSION":
      var deletedSession = state.sessions.filter(session => { return session.id === action.id })[0]
      var sessions = removeEntityFromState(action.id, state, "sessions")
      return Object.assign({}, state, { deletedSession: deletedSession, sessions: sessions})
    case "SESSION_LAUNCH":
    case "SESSION_PAUSE":
      var sessions = mergeEntityAndState(action.session, state, "sessions")
      return Object.assign({}, state, { sessions: sessions })
    case "SESSION_PUSH":
      var sessions = mergeEntityAndState(action.session, state, "sessions")
      return Object.assign({}, state, { sessions: sessions, session: action.session })
    default:
      break
  }
  return state
}

const gameReducer = function(state = {}, action) {
  switch(action.type) {
    case "GAMES":
      return Object.assign({}, state, { games: action.games })
    case "NEW_GAME":
      var games = pushNewEntityToState(action.game, state, "games")
      return Object.assign({}, state, { newGame: action.game, games: games })
    case "UPDATE_GAME":
      var games = mergeEntityAndState(action.game, state, "games")
      return Object.assign({}, state, { updatedGame: action.game, games: games})
    case "DESTROY_GAME":
      var deletedGame = state.games.filter(game => { return game.id === action.id })[0]
      var games = removeEntityFromState(action.id, state, "games")
      return Object.assign({}, state, { deletedGame: deletedGame, games: games})
    case "UPLOAD_FILE":
      var games = mergeEntityAndState(action.game, state, "games")
      return Object.assign({}, state, { games: games })
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
      if (list[index].id != id) {
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
  userState: userReducer,

  areaState: areaReducer,
  specialityState: specialityReducer,
  schoolState: schoolReducer,
  sessionState: sessionReducer,
  gameState: gameReducer,

});

const store = createStore(reducers);

export default store
