import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
//import {Router, Route, Switch} from "react-router-dom";
//import {createBrowserHistory} from 'history'
import { Provider } from "react-redux";
import createStore from "./store/store";
import App from './App';

ReactDOM.render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);


/*const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/auth" children={<Authorisation />} />
      <Route
        path={["/", "/main"]}
        children={
          <Provider store={createStore()}>
            <App />
          </Provider>
        }
      />
    </Switch>
  </Router>,
  document.getElementById('root')
);*/
