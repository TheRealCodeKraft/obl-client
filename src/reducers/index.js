import { createStore, combineReducers } from 'redux';

// The User Reducer
const userReducer = function(state = {}, action) {
  switch(action.type) {
    case 'ME':
      return Object.assign({}, state, { me: action.user })
  }
  return state;
}

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
});

const store = createStore(reducers);

export default store
