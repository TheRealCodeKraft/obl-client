import { createStore, combineReducers } from 'redux';

// The User Reducer
const userReducer = function(state = {}, action) {
  switch(action.type) {
    case 'RESET_ME':
      return Object.assign({}, state, { me: null, notFound: false })
    case 'ME':
      return Object.assign({}, state, { me: action.user, notFound: false })
    case 'USER_NOT_FOUND':
      return Object.assign({}, state, { me: null, notFound: true })
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

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  areaState: areaReducer,
});

const store = createStore(reducers);

export default store
