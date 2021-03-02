import { combineReducers, createStore } from 'redux'
import notesReducer from './features/notesSlice'
import labelsReducer from './features/labelsSlice'


const rootReducer = combineReducers({
  notes: notesReducer,
  labels: labelsReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);