import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import App from './components/App';
import 'materialize-css/dist/css/materialize.min.css'
import store from "./store";
import {Provider} from "react-redux";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


