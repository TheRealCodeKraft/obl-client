import { createStore } from 'codekraft-react-frontend'

const reducers = [
  "session",
  "game",
  "area",
  {
    "singular": "speciality",
    "plural": "specialities"
  },
  "school",
  "objective",
  "scenario",
  "decisionMaker",
  "room",
  "clue"
]

// Combine Reducers
/*
const reducers = { 
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

}
*/

const store = createStore(reducers);

export default store
