import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import App from './components/App';
import 'materialize-css/dist/css/materialize.min.css'
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from "react-redux";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App persistor={persistor}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


