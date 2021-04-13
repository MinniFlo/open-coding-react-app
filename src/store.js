import { combineReducers, createStore } from 'redux'
import notesReducer from './features/notesSlice'
import labelsReducer from './features/labelsSlice'
import navigationReducer from "./features/navigationSlice";
import { persistStore, persistReducer} from "redux-persist"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'


const appReducer = combineReducers({
  notes: notesReducer,
  labels: labelsReducer,
  navigation: navigationReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
}

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ['notes', 'labels']
}

const perReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  perReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);