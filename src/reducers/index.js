import { createStore, combineReducers } from 'redux';

// The User Reducer
const userReducer = function(state = {}, action) {
  switch(action.type) {
    case 'RESET_ME':
console.log("REDUX SPEAKS !")
      return Object.assign({}, state, { me: null, notFound: false })
    case 'ME':
console.log("REDUX GIVE ME A USER")
console.log(action.user)
      return Object.assign({}, state, { me: action.user, notFound: false })
    case 'USER_NOT_FOUND':
      return Object.assign({}, state, { me: null, notFound: true })
  }
  return state;
}

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
});

const store = createStore(reducers);

export default store
