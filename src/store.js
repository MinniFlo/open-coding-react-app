import { combineReducers, createStore } from 'redux'
import notesReducer from './features/notesSlice'
import labelsReducer from './features/labelsSlice'
import { persistStore, persistReducer} from "redux-persist"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
  notes: notesReducer,
  labels: labelsReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
}

const perReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  perReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);