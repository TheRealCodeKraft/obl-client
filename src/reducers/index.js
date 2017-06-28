import { createStore, combineReducers } from 'redux';

// The User Reducer
const userReducer = function(state = {}, action) {
  switch(action.type) {
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
    default:
      break
  }
  return state
}

const gameReducer = function(state = {}, action) {
  switch(action.type) {
    case "GAMES":
      return Object.assign({}, state, { games: action.games })
    default:
      break
  }
  return state
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
